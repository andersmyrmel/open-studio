// Type definitions for Open-Studio

export interface QueryResult {
  success: boolean;
  data?: any[];
  rowCount?: number;
  error?: string;
  duration?: number;
}

export interface QueryRequest {
  query: string;
  params?: any[];
}

export interface TableInfo {
  schemaName: string;
  tableName: string;
  rowCount?: number;
}

export interface ColumnInfo {
  columnName: string;
  dataType: string;
  isNullable: boolean;
  columnDefault?: string;
  characterMaximumLength?: number;
}

export interface DatabaseError {
  message: string;
  code?: string;
  detail?: string;
  hint?: string;
}
