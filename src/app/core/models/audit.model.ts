export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'SETTINGS_CHANGE';

export interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  action: AuditAction;
  resource: string;
  details: string;
  timestamp: string; // ISO date string
  ipAddress: string;
  userAgent: string;
}
