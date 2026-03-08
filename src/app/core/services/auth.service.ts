import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface MockCredential {
  email: string;
  password: string;
  user: AuthUser;
}

const MOCK_CREDENTIALS: MockCredential[] = [
  {
    email: 'admin@forge.dev',
    password: 'Admin123!',
    user: {
      id: 'auth-1',
      name: 'Admin User',
      email: 'admin@forge.dev',
      role: 'Admin',
      avatar: 'AU',
    },
  },
  {
    email: 'manager@forge.dev',
    password: 'Manager123!',
    user: {
      id: 'auth-2',
      name: 'Manager User',
      email: 'manager@forge.dev',
      role: 'Manager',
      avatar: 'MU',
    },
  },
  {
    email: 'viewer@forge.dev',
    password: 'Viewer123!',
    user: {
      id: 'auth-3',
      name: 'Viewer User',
      email: 'viewer@forge.dev',
      role: 'Viewer',
      avatar: 'VU',
    },
  },
];

const TOKEN_KEY = 'af_token';
const USER_KEY = 'af_user';
const LAST_ACTIVITY_KEY = 'af_last_activity';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const WARNING_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  private _currentUser = signal<AuthUser | null>(this.loadUserFromStorage());
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);

  private sessionTimer: ReturnType<typeof setTimeout> | null = null;
  private warningTimer: ReturnType<typeof setTimeout> | null = null;
  showSessionWarning = signal(false);

  constructor() {
    if (this.isLoggedIn()) {
      this.startSessionTimers();
      this.setupActivityListeners();
    }
  }

  private loadUserFromStorage(): AuthUser | null {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const userStr = localStorage.getItem(USER_KEY);
      if (token && userStr) {
        return JSON.parse(userStr) as AuthUser;
      }
    } catch {
      // ignore parse errors
    }
    return null;
  }

  login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const credential = MOCK_CREDENTIALS.find(
          (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
        );
        if (credential) {
          const mockToken = btoa(JSON.stringify({ sub: credential.user.id, role: credential.user.role, iat: Date.now() }));
          localStorage.setItem(TOKEN_KEY, mockToken);
          localStorage.setItem(USER_KEY, JSON.stringify(credential.user));
          localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
          this._currentUser.set(credential.user);
          this.startSessionTimers();
          this.setupActivityListeners();
          resolve({ success: true });
        } else {
          resolve({ success: false, error: 'Invalid email or password.' });
        }
      }, 800);
    });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    this._currentUser.set(null);
    this.showSessionWarning.set(false);
    this.clearTimers();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  hasRole(role: UserRole | UserRole[]): boolean {
    const user = this._currentUser();
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private startSessionTimers(): void {
    this.clearTimers();
    const lastActivity = parseInt(localStorage.getItem(LAST_ACTIVITY_KEY) || Date.now().toString(), 10);
    const elapsed = Date.now() - lastActivity;
    const remaining = SESSION_TIMEOUT_MS - elapsed;

    if (remaining <= 0) {
      this.logout();
      return;
    }

    const warningIn = remaining - WARNING_THRESHOLD_MS;
    if (warningIn > 0) {
      this.warningTimer = setTimeout(() => {
        this.showSessionWarning.set(true);
      }, warningIn);
    } else {
      this.showSessionWarning.set(true);
    }

    this.sessionTimer = setTimeout(() => {
      this.logout();
    }, remaining);
  }

  private clearTimers(): void {
    if (this.sessionTimer) clearTimeout(this.sessionTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);
    this.sessionTimer = null;
    this.warningTimer = null;
  }

  private setupActivityListeners(): void {
    const resetActivity = () => {
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
      this.showSessionWarning.set(false);
      this.startSessionTimers();
    };

    ['mousemove', 'keydown', 'click', 'scroll'].forEach((event) => {
      window.addEventListener(event, resetActivity, { passive: true });
    });
  }

  extendSession(): void {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    this.showSessionWarning.set(false);
    this.startSessionTimers();
  }
}
