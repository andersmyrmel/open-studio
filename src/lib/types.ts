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

// SQL Editor types
export interface UserContent {
  id: string
  name: string
  description?: string
  type: 'sql' | 'folder'
  content?: {
    schema?: string
    content_id: string
    sql?: string
    favorite?: boolean
  }
  visibility: 'user' | 'project' | 'public'
  project_id?: number
  owner_id?: string
  created_at: string
  updated_at: string
}

// Database function form schema
export interface FormSchema {
  name: string
  schema: string
  return_type: string
  args?: Array<{
    name: string
    type: string
    mode?: 'in' | 'out' | 'inout'
  }>
  definition: string
  language: string
  behavior?: 'immutable' | 'stable' | 'volatile'
  security_definer?: boolean
  config_params?: Record<string, string>
}
