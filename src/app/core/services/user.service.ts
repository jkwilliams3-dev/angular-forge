import { Injectable } from '@angular/core';
import { User, UserRole, UserStatus, PagedResult } from '../models/user.model';

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function monthsAgo(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString();
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@forge.dev', role: 'Admin', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'SC', createdAt: monthsAgo(12) },
  { id: '2', name: 'Marcus Williams', email: 'marcus.williams@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(1), department: 'Operations', avatar: 'MW', createdAt: monthsAgo(10) },
  { id: '3', name: 'Priya Patel', email: 'priya.patel@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(2), department: 'Finance', avatar: 'PP', createdAt: monthsAgo(8) },
  { id: '4', name: 'Alejandro Reyes', email: 'alejandro.reyes@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Sales', avatar: 'AR', createdAt: monthsAgo(9) },
  { id: '5', name: 'Fatima Al-Hassan', email: 'fatima.alhassan@forge.dev', role: 'Viewer', status: 'Inactive', lastLogin: daysAgo(45), department: 'HR', avatar: 'FA', createdAt: monthsAgo(11) },
  { id: '6', name: "James O'Brien", email: 'james.obrien@forge.dev', role: 'Admin', status: 'Active', lastLogin: daysAgo(1), department: 'Engineering', avatar: 'JO', createdAt: monthsAgo(14) },
  { id: '7', name: 'Yuki Tanaka', email: 'yuki.tanaka@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(3), department: 'Design', avatar: 'YT', createdAt: monthsAgo(6) },
  { id: '8', name: 'Amara Okonkwo', email: 'amara.okonkwo@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Marketing', avatar: 'AO', createdAt: monthsAgo(7) },
  { id: '9', name: 'Dmitri Volkov', email: 'dmitri.volkov@forge.dev', role: 'Viewer', status: 'Pending', lastLogin: daysAgo(10), department: 'Legal', avatar: 'DV', createdAt: monthsAgo(2) },
  { id: '10', name: 'Isabella Rossi', email: 'isabella.rossi@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(2), department: 'Finance', avatar: 'IR', createdAt: monthsAgo(9) },
  { id: '11', name: 'Noah Thompson', email: 'noah.thompson@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(4), department: 'Engineering', avatar: 'NT', createdAt: monthsAgo(5) },
  { id: '12', name: 'Zara Ahmed', email: 'zara.ahmed@forge.dev', role: 'Admin', status: 'Active', lastLogin: daysAgo(0), department: 'Operations', avatar: 'ZA', createdAt: monthsAgo(16) },
  { id: '13', name: 'Lucas Fernandez', email: 'lucas.fernandez@forge.dev', role: 'Manager', status: 'Inactive', lastLogin: daysAgo(60), department: 'Sales', avatar: 'LF', createdAt: monthsAgo(13) },
  { id: '14', name: 'Aisha Johnson', email: 'aisha.johnson@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(1), department: 'HR', avatar: 'AJ', createdAt: monthsAgo(4) },
  { id: '15', name: 'Wei Zhang', email: 'wei.zhang@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'WZ', createdAt: monthsAgo(11) },
  { id: '16', name: 'Benjamin Harris', email: 'benjamin.harris@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(5), department: 'Marketing', avatar: 'BH', createdAt: monthsAgo(7) },
  { id: '17', name: 'Naledi Dlamini', email: 'naledi.dlamini@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(2), department: 'Finance', avatar: 'ND', createdAt: monthsAgo(8) },
  { id: '18', name: 'Ravi Kumar', email: 'ravi.kumar@forge.dev', role: 'Admin', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'RK', createdAt: monthsAgo(20) },
  { id: '19', name: 'Sophie Müller', email: 'sophie.muller@forge.dev', role: 'Viewer', status: 'Pending', lastLogin: daysAgo(7), department: 'Design', avatar: 'SM', createdAt: monthsAgo(1) },
  { id: '20', name: 'Omar Hassan', email: 'omar.hassan@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(1), department: 'Legal', avatar: 'OH', createdAt: monthsAgo(10) },
  { id: '21', name: 'Emily Clarke', email: 'emily.clarke@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(3), department: 'HR', avatar: 'EC', createdAt: monthsAgo(6) },
  { id: '22', name: 'Kwame Mensah', email: 'kwame.mensah@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Operations', avatar: 'KM', createdAt: monthsAgo(9) },
  { id: '23', name: 'Anastasia Petrov', email: 'anastasia.petrov@forge.dev', role: 'Viewer', status: 'Inactive', lastLogin: daysAgo(90), department: 'Marketing', avatar: 'AP', createdAt: monthsAgo(15) },
  { id: '24', name: 'Carlos Romero', email: 'carlos.romero@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(2), department: 'Sales', avatar: 'CR', createdAt: monthsAgo(7) },
  { id: '25', name: 'Mei Lin', email: 'mei.lin@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(4), department: 'Engineering', avatar: 'ML', createdAt: monthsAgo(5) },
  { id: '26', name: 'David Kim', email: 'david.kim@forge.dev', role: 'Admin', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'DK', createdAt: monthsAgo(18) },
  { id: '27', name: 'Layla Nasser', email: 'layla.nasser@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(6), department: 'Legal', avatar: 'LN', createdAt: monthsAgo(3) },
  { id: '28', name: 'Thomas Anderson', email: 'thomas.anderson@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(1), department: 'Finance', avatar: 'TA', createdAt: monthsAgo(11) },
  { id: '29', name: 'Keisha Brown', email: 'keisha.brown@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(2), department: 'HR', avatar: 'KB', createdAt: monthsAgo(4) },
  { id: '30', name: 'Arjun Singh', email: 'arjun.singh@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'AS', createdAt: monthsAgo(8) },
  { id: '31', name: 'Rachel Green', email: 'rachel.green@forge.dev', role: 'Viewer', status: 'Pending', lastLogin: daysAgo(12), department: 'Design', avatar: 'RG', createdAt: monthsAgo(1) },
  { id: '32', name: 'Mateus Silva', email: 'mateus.silva@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(3), department: 'Sales', avatar: 'MS', createdAt: monthsAgo(6) },
  { id: '33', name: 'Hannah Schmidt', email: 'hannah.schmidt@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(1), department: 'Marketing', avatar: 'HS', createdAt: monthsAgo(5) },
  { id: '34', name: 'Yusuf Ibrahim', email: 'yusuf.ibrahim@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Operations', avatar: 'YI', createdAt: monthsAgo(9) },
  { id: '35', name: 'Chloe Martin', email: 'chloe.martin@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(5), department: 'Finance', avatar: 'CM', createdAt: monthsAgo(7) },
  { id: '36', name: 'Robert Jackson', email: 'robert.jackson@forge.dev', role: 'Admin', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'RJ', createdAt: monthsAgo(22) },
  { id: '37', name: 'Aiko Sato', email: 'aiko.sato@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(8), department: 'Design', avatar: 'AS', createdAt: monthsAgo(3) },
  { id: '38', name: 'Miguel Torres', email: 'miguel.torres@forge.dev', role: 'Manager', status: 'Inactive', lastLogin: daysAgo(70), department: 'Sales', avatar: 'MT', createdAt: monthsAgo(14) },
  { id: '39', name: 'Ingrid Larsson', email: 'ingrid.larsson@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(2), department: 'Legal', avatar: 'IL', createdAt: monthsAgo(6) },
  { id: '40', name: 'Jamal Washington', email: 'jamal.washington@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(1), department: 'HR', avatar: 'JW', createdAt: monthsAgo(10) },
  { id: '41', name: 'Victoria Nguyen', email: 'victoria.nguyen@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(3), department: 'Marketing', avatar: 'VN', createdAt: monthsAgo(5) },
  { id: '42', name: 'Soren Nielsen', email: 'soren.nielsen@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'SN', createdAt: monthsAgo(12) },
  { id: '43', name: 'Fatou Diallo', email: 'fatou.diallo@forge.dev', role: 'Viewer', status: 'Pending', lastLogin: daysAgo(15), department: 'Finance', avatar: 'FD', createdAt: monthsAgo(2) },
  { id: '44', name: 'Ethan Reynolds', email: 'ethan.reynolds@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(1), department: 'Operations', avatar: 'ER', createdAt: monthsAgo(8) },
  { id: '45', name: 'Nadia Kowalski', email: 'nadia.kowalski@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(4), department: 'HR', avatar: 'NK', createdAt: monthsAgo(4) },
  { id: '46', name: 'Tariq Al-Rashid', email: 'tariq.alrashid@forge.dev', role: 'Admin', status: 'Active', lastLogin: daysAgo(0), department: 'Engineering', avatar: 'TR', createdAt: monthsAgo(24) },
  { id: '47', name: 'Amelia Johansson', email: 'amelia.johansson@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(2), department: 'Design', avatar: 'AJ', createdAt: monthsAgo(5) },
  { id: '48', name: 'Kiri Waititi', email: 'kiri.waititi@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(1), department: 'Marketing', avatar: 'KW', createdAt: monthsAgo(7) },
  { id: '49', name: 'Sebastien Leclerc', email: 'sebastien.leclerc@forge.dev', role: 'Viewer', status: 'Inactive', lastLogin: daysAgo(55), department: 'Legal', avatar: 'SL', createdAt: monthsAgo(16) },
  { id: '50', name: 'Ayasha Morningstar', email: 'ayasha.morningstar@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(0), department: 'Sales', avatar: 'AM', createdAt: monthsAgo(9) },
  { id: '51', name: 'Chidera Obi', email: 'chidera.obi@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(6), department: 'Finance', avatar: 'CO', createdAt: monthsAgo(3) },
  { id: '52', name: 'Lena Hoffmann', email: 'lena.hoffmann@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(2), department: 'Engineering', avatar: 'LH', createdAt: monthsAgo(11) },
  { id: '53', name: 'Jerome Baptiste', email: 'jerome.baptiste@forge.dev', role: 'Viewer', status: 'Active', lastLogin: daysAgo(3), department: 'Operations', avatar: 'JB', createdAt: monthsAgo(6) },
  { id: '54', name: 'Minako Hayashi', email: 'minako.hayashi@forge.dev', role: 'Manager', status: 'Active', lastLogin: daysAgo(1), department: 'HR', avatar: 'MH', createdAt: monthsAgo(8) },
  { id: '55', name: 'Ibrahim Al-Sayed', email: 'ibrahim.alsayed@forge.dev', role: 'Viewer', status: 'Pending', lastLogin: daysAgo(20), department: 'Design', avatar: 'IS', createdAt: monthsAgo(1) },
];

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [...MOCK_USERS];
  private nextId = MOCK_USERS.length + 1;

  getUsers(
    page: number,
    pageSize: number,
    filters: UserFilters = {}
  ): Promise<PagedResult<User>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...this.users];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (u) =>
              u.name.toLowerCase().includes(q) ||
              u.email.toLowerCase().includes(q) ||
              u.department.toLowerCase().includes(q)
          );
        }

        if (filters.role && filters.role !== 'All') {
          result = result.filter((u) => u.role === filters.role);
        }

        if (filters.status && filters.status !== 'All') {
          result = result.filter((u) => u.status === filters.status);
        }

        if (filters.sortColumn) {
          const col = filters.sortColumn as keyof User;
          result.sort((a, b) => {
            const av = String(a[col] ?? '');
            const bv = String(b[col] ?? '');
            const cmp = av.localeCompare(bv);
            return filters.sortDirection === 'desc' ? -cmp : cmp;
          });
        }

        const total = result.length;
        const start = (page - 1) * pageSize;
        const data = result.slice(start, start + pageSize);

        resolve({ data, total, page, pageSize });
      }, 300);
    });
  }

  getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  createUser(user: Omit<User, 'id' | 'avatar' | 'createdAt' | 'lastLogin'>): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initials = user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        const newUser: User = {
          ...user,
          id: String(this.nextId++),
          avatar: initials,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        this.users.unshift(newUser);
        resolve(newUser);
      }, 300);
    });
  }

  updateUser(id: string, data: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1) {
          reject(new Error('User not found'));
          return;
        }
        this.users[idx] = { ...this.users[idx], ...data };
        resolve(this.users[idx]);
      }, 300);
    });
  }

  deleteUser(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users = this.users.filter((u) => u.id !== id);
        resolve();
      }, 300);
    });
  }

  toggleStatus(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
          reject(new Error('User not found'));
          return;
        }
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
        resolve(user);
      }, 200);
    });
  }

  bulkUpdateRole(ids: string[], role: UserRole): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const user = this.users.find((u) => u.id === id);
          if (user) user.role = role;
        });
        resolve();
      }, 300);
    });
  }

  bulkDeactivate(ids: string[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const user = this.users.find((u) => u.id === id);
          if (user) user.status = 'Inactive';
        });
        resolve();
      }, 300);
    });
  }

  exportToCsv(users: User[]): void {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Department', 'Last Login', 'Created At'];
    const rows = users.map((u) => [
      u.id,
      u.name,
      u.email,
      u.role,
      u.status,
      u.department,
      u.lastLogin,
      u.createdAt,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
