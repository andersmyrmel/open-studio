/**
 * Queue utilities stub for Open Studio
 */

export enum QUEUE_MESSAGE_TYPE {
  STANDARD = 'standard',
  PRIORITY = 'priority',
  DELAYED = 'delayed',
  AVAILABLE = 'available',
  SCHEDULED = 'scheduled',
  ARCHIVED = 'archived',
}

export const parseQueueMessage = (message: any) => {
  return message
}

export const formatQueueStatus = (status: string) => {
  return status
}
