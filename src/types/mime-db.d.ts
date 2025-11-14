/**
 * Type declarations for mime-db package
 */

declare module 'mime-db' {
  interface MimeEntry {
    source: string
    compressible?: boolean
    extensions?: string[]
    charset?: string
  }

  interface MimeDatabase {
    [mimeType: string]: MimeEntry
  }

  const db: MimeDatabase
  export default db
}
