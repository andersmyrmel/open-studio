/**
 * @supabase/shared-types stub for Open Studio
 * Permission and access control constants
 */

/**
 * Permission actions for RBAC (Role-Based Access Control)
 * In standalone mode, all permissions are granted by default
 */
export enum PermissionAction {
  // Database
  SQL_SELECT = 'sql.select',
  SQL_INSERT = 'sql.insert',
  SQL_UPDATE = 'sql.update',
  SQL_DELETE = 'sql.delete',

  // Tables
  TENANT_SQL_SELECT = 'tenant.sql_select',
  TENANT_SQL_INSERT = 'tenant.sql_insert',
  TENANT_SQL_UPDATE = 'tenant.sql_update',
  TENANT_SQL_DELETE = 'tenant.sql_delete',

  // Functions
  TENANT_SQL_FUNCTION_CREATE = 'tenant.sql_function_create',
  TENANT_SQL_FUNCTION_READ = 'tenant.sql_function_read',
  TENANT_SQL_FUNCTION_UPDATE = 'tenant.sql_function_update',
  TENANT_SQL_FUNCTION_DELETE = 'tenant.sql_function_delete',

  // Extensions
  TENANT_SQL_EXTENSION_CREATE = 'tenant.sql_extension_create',
  TENANT_SQL_EXTENSION_READ = 'tenant.sql_extension_read',
  TENANT_SQL_EXTENSION_UPDATE = 'tenant.sql_extension_update',
  TENANT_SQL_EXTENSION_DELETE = 'tenant.sql_extension_delete',

  // Triggers
  TENANT_SQL_TRIGGER_CREATE = 'tenant.sql_trigger_create',
  TENANT_SQL_TRIGGER_READ = 'tenant.sql_trigger_read',
  TENANT_SQL_TRIGGER_UPDATE = 'tenant.sql_trigger_update',
  TENANT_SQL_TRIGGER_DELETE = 'tenant.sql_trigger_delete',

  // Policies
  TENANT_SQL_POLICY_CREATE = 'tenant.sql_policy_create',
  TENANT_SQL_POLICY_READ = 'tenant.sql_policy_read',
  TENANT_SQL_POLICY_UPDATE = 'tenant.sql_policy_update',
  TENANT_SQL_POLICY_DELETE = 'tenant.sql_policy_delete',

  // Publications
  TENANT_SQL_PUBLICATION_CREATE = 'tenant.sql_publication_create',
  TENANT_SQL_PUBLICATION_READ = 'tenant.sql_publication_read',
  TENANT_SQL_PUBLICATION_UPDATE = 'tenant.sql_publication_update',
  TENANT_SQL_PUBLICATION_DELETE = 'tenant.sql_publication_delete',

  // Analytics
  ANALYTICS_READ = 'analytics.read',

  // Infra
  INFRA_EXECUTE = 'infra.execute',
}

/**
 * Organization permission subject
 */
export enum OrganizationPermissionSubject {
  Organization = 'Organization',
  Project = 'Project',
  Database = 'Database',
}

/**
 * Project permission subject
 */
export enum ProjectPermissionSubject {
  Project = 'Project',
  Database = 'Database',
  Settings = 'Settings',
}

/**
 * Support ticket categories
 */
export enum SupportCategories {
  TECHNICAL_ISSUE = 'technical_issue',
  BILLING = 'billing',
  FEATURE_REQUEST = 'feature_request',
  GENERAL = 'general',
  BUG_REPORT = 'bug_report',
}
