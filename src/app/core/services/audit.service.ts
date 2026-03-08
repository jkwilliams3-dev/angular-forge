import { Injectable } from '@angular/core';
import { AuditEntry, AuditAction } from '../models/audit.model';

function randomDate(daysBack: number): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  d.setHours(Math.floor(Math.random() * 24));
  d.setMinutes(Math.floor(Math.random() * 60));
  return d.toISOString();
}

const IPS = [
  '192.168.1.101', '192.168.1.102', '10.0.0.55', '172.16.0.12',
  '10.10.10.5', '192.168.0.200', '10.0.1.45', '172.20.0.8',
];

const AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605',
  'Mozilla/5.0 (X11; Linux x86_64) Firefox/121',
  'Mozilla/5.0 (Windows NT 10.0) Edge/120',
];

interface AuditActor {
  id: string;
  name: string;
}

const ACTORS: AuditActor[] = [
  { id: '1', name: 'Sarah Chen' },
  { id: '6', name: "James O'Brien" },
  { id: '12', name: 'Zara Ahmed' },
  { id: '18', name: 'Ravi Kumar' },
  { id: '26', name: 'David Kim' },
  { id: '36', name: 'Robert Jackson' },
  { id: '46', name: 'Tariq Al-Rashid' },
  { id: '2', name: 'Marcus Williams' },
  { id: '8', name: 'Amara Okonkwo' },
  { id: '22', name: 'Kwame Mensah' },
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const ACTION_TEMPLATES: { action: AuditAction; resource: string; details: string }[] = [
  { action: 'LOGIN', resource: 'Auth', details: 'User logged in successfully' },
  { action: 'LOGOUT', resource: 'Auth', details: 'User session ended' },
  { action: 'CREATE', resource: 'User', details: 'Created new user account' },
  { action: 'UPDATE', resource: 'User', details: 'Updated user profile information' },
  { action: 'DELETE', resource: 'User', details: 'Deleted user account permanently' },
  { action: 'UPDATE', resource: 'User', details: 'Changed user role from Viewer to Manager' },
  { action: 'UPDATE', resource: 'User', details: 'Deactivated user account' },
  { action: 'EXPORT', resource: 'Report', details: 'Exported users data to CSV' },
  { action: 'EXPORT', resource: 'Report', details: 'Exported audit log to CSV' },
  { action: 'SETTINGS_CHANGE', resource: 'Settings', details: 'Updated password policy settings' },
  { action: 'SETTINGS_CHANGE', resource: 'Settings', details: 'Enabled MFA requirement' },
  { action: 'SETTINGS_CHANGE', resource: 'Settings', details: 'Changed session timeout to 60 minutes' },
  { action: 'SETTINGS_CHANGE', resource: 'Settings', details: 'Updated company name' },
  { action: 'CREATE', resource: 'User', details: 'Bulk created 5 user accounts' },
  { action: 'UPDATE', resource: 'User', details: 'Bulk updated roles to Manager' },
  { action: 'DELETE', resource: 'User', details: 'Removed inactive user accounts' },
  { action: 'LOGIN', resource: 'Auth', details: 'Failed login attempt blocked' },
  { action: 'EXPORT', resource: 'Report', details: 'Exported department report to CSV' },
  { action: 'SETTINGS_CHANGE', resource: 'Settings', details: 'Updated notification preferences' },
  { action: 'UPDATE', resource: 'User', details: 'Reset user password' },
];

function generateAuditEntries(): AuditEntry[] {
  const entries: AuditEntry[] = [];
  for (let i = 1; i <= 120; i++) {
    const actor = randomFrom(ACTORS);
    const template = randomFrom(ACTION_TEMPLATES);
    entries.push({
      id: String(i),
      userId: actor.id,
      userName: actor.name,
      action: template.action,
      resource: template.resource,
      details: template.details,
      timestamp: randomDate(90),
      ipAddress: randomFrom(IPS),
      userAgent: randomFrom(AGENTS),
    });
  }
  return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export interface AuditFilters {
  search?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable({ providedIn: 'root' })
export class AuditService {
  private entries: AuditEntry[] = generateAuditEntries();

  getAuditLogs(
    page: number,
    pageSize: number,
    filters: AuditFilters = {}
  ): Promise<{ data: AuditEntry[]; total: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...this.entries];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (e) =>
              e.userName.toLowerCase().includes(q) ||
              e.resource.toLowerCase().includes(q) ||
              e.details.toLowerCase().includes(q)
          );
        }

        if (filters.action && filters.action !== 'All') {
          result = result.filter((e) => e.action === filters.action);
        }

        if (filters.startDate) {
          const start = new Date(filters.startDate).getTime();
          result = result.filter((e) => new Date(e.timestamp).getTime() >= start);
        }

        if (filters.endDate) {
          const end = new Date(filters.endDate).getTime() + 86400000;
          result = result.filter((e) => new Date(e.timestamp).getTime() <= end);
        }

        const total = result.length;
        const start = (page - 1) * pageSize;
        const data = result.slice(start, start + pageSize);

        resolve({ data, total });
      }, 300);
    });
  }

  getRecentEntries(limit: number): AuditEntry[] {
    return this.entries.slice(0, limit);
  }

  exportToCsv(entries: AuditEntry[]): void {
    const headers = ['ID', 'User', 'Action', 'Resource', 'Details', 'Timestamp', 'IP Address'];
    const rows = entries.map((e) => [
      e.id,
      e.userName,
      e.action,
      e.resource,
      `"${e.details}"`,
      e.timestamp,
      e.ipAddress,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
