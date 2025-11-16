/**
 * Lightweight SQL parser for telemetry event detection.
 *
 * [Sean] Replace this with a proper SQL parser like `@supabase/pg-parser` once a
 * browser-compatible version is available.
 */
import { TABLE_EVENT_ACTIONS, TableEventAction } from 'common/telemetry-constants'

export interface TableEventDetails {
  type: TableEventAction
  schema?: string
  tableName?: string
}

type Detector = {
  type: TableEventAction
  patterns: { regex: RegExp; schemaGroup: number; tableGroup: number }[]
}

export class SQLEventParser {
  private static DETECTORS: Detector[] = [
    {
      type: TABLE_EVENT_ACTIONS.TableCreated,
      patterns: [
        { regex: /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?((?:"[^"]+"|[\w]+)\.)?([\ w"`]+)/i, schemaGroup: 1, tableGroup: 2 },
        { regex: /CREATE\s+TEMP(?:ORARY)?\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?((?:"[^"]+"|[\w]+)\.)?([\ w"`]+)/i, schemaGroup: 1, tableGroup: 2 },
        { regex: /CREATE\s+UNLOGGED\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?((?:"[^"]+"|[\w]+)\.)?([\ w"`]+)/i, schemaGroup: 1, tableGroup: 2 },
        { regex: /SELECT\s+.*?\s+INTO\s+((?:"[^"]+"|[\w]+)\.)?([\ w"`]+)/is, schemaGroup: 1, tableGroup: 2 },
        { regex: /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?((?:"[^"]+"|[\w]+)\.)?([\ w"`]+)\s+AS\s+SELECT/i, schemaGroup: 1, tableGroup: 2 },
      ],
    },
    {
      type: TABLE_EVENT_ACTIONS.TableDataAdded,
      patterns: [
        { regex: /INSERT\s+INTO\s+((?:"[^"]+"|[\w]+)\.)?([\ w"`]+)/i, schemaGroup: 1, tableGroup: 2 },
        { regex: /COPY\s+((?:"[^"]+"|[\w]+)\.)?([\ w"`]+)\s+FROM/i, schemaGroup: 1, tableGroup: 2 },
      ],
    },
    {
      type: TABLE_EVENT_ACTIONS.TableRLSEnabled,
      patterns: [
        { regex: /ALTER\s+TABLE\s+((?:"[^"]+"|[\w]+)\.)?([\ w"`]+).*?ENABLE\s+ROW\s+LEVEL\s+SECURITY/i, schemaGroup: 1, tableGroup: 2 },
        { regex: /ALTER\s+TABLE\s+((?:"[^"]+"|[\w]+)\.)?([\ w"`]+).*?ENABLE\s+RLS/i, schemaGroup: 1, tableGroup: 2 },
      ],
    },
  ]

  private cleanIdentifier(identifier?: string) {
    return identifier?.replace(/["`']/g, '').replace(/\.$/, '')
  }

  private match(sql: string): TableEventDetails | null {
    for (const { type, patterns } of SQLEventParser.DETECTORS) {
      for (const { regex, schemaGroup, tableGroup } of patterns) {
        const match = sql.match(regex)
        if (match) {
          return {
            type,
            schema: this.cleanIdentifier(match[schemaGroup]),
            tableName: this.cleanIdentifier(match[tableGroup]),
          }
        }
      }
    }
    return null
  }

  private splitStatements(sql: string): string[] {
    // Regex matches:
    // - single quotes ('...') with escapes
    // - double quotes ("...")
    // - dollar-quoted blocks ($$...$$ or $tag$...$tag$)
    // - semicolons
    // - everything else
    const tokens =
      sql.match(
        /'([^']|'')*'|"([^"]|"")*"|\$[a-zA-Z0-9_]*\$[\s\S]*?\$[a-zA-Z0-9_]*\$|;|[^'"$;]+/g
      ) || []

    const statements: string[] = []
    let current = ''

    for (const token of tokens) {
      if (token === ';') {
        if (current.trim()) statements.push(current.trim())
        current = ''
      } else {
        current += token
      }
    }

    if (current.trim()) {
      statements.push(current.trim())
    }

    return statements
  }

  private deduplicate(events: TableEventDetails[]): TableEventDetails[] {
    const seen = new Set<string>()
    return events.filter((e) => {
      const key = `${e.type}:${e.schema || ''}:${e.tableName || ''}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  private removeComments(sql: string): string {
    return sql
      .replace(/--.*?$/gm, '') // line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
  }

  getTableEvents(sql: string): TableEventDetails[] {
    const statements = this.splitStatements(this.removeComments(sql))
    const results: TableEventDetails[] = []

    for (const stmt of statements) {
      const event = this.match(stmt)
      if (event) results.push(event)
    }

    return this.deduplicate(results)
  }
}

export const sqlEventParser = new SQLEventParser()
