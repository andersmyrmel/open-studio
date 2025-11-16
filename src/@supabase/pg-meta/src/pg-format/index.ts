/**
 * pg-format stub for Open Studio
 */

export function format(sql: string, ...values: any[]): string {
  return sql
}

// Escapes SQL identifiers (table names, column names, etc.)
export function ident(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

export default format
