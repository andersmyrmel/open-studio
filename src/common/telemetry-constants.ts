/**
 * Telemetry constants stub for Open Studio
 */

export enum TABLE_EVENT_ACTIONS {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  SELECT = 'select',
  INSERT = 'insert',
}

export type TableEventAction = TABLE_EVENT_ACTIONS

export interface ImportDataFileDroppedEvent {
  type: 'import_data_file_dropped'
  fileType: string
  fileSize: number
}
