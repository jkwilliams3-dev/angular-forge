import { Component, Input } from '@angular/core';
import { UserStatus, UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span [class]="badgeClass" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
      <span class="w-1.5 h-1.5 rounded-full mr-1.5" [class]="dotClass"></span>
      {{ label }}
    </span>
  `,
})
export class StatusBadgeComponent {
  @Input() status: UserStatus | UserRole | null = null;

  get label(): string {
    return this.status ?? '';
  }

  get badgeClass(): string {
    switch (this.status) {
      case 'Active': return 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/50';
      case 'Inactive': return 'bg-red-900/50 text-red-400 border border-red-700/50';
      case 'Pending': return 'bg-amber-900/50 text-amber-400 border border-amber-700/50';
      case 'Admin': return 'bg-blue-900/50 text-blue-400 border border-blue-700/50';
      case 'Manager': return 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/50';
      case 'Viewer': return 'bg-slate-700/50 text-slate-400 border border-slate-600/50';
      default: return 'bg-slate-700 text-slate-400';
    }
  }

  get dotClass(): string {
    switch (this.status) {
      case 'Active': return 'bg-emerald-400';
      case 'Inactive': return 'bg-red-400';
      case 'Pending': return 'bg-amber-400';
      case 'Admin': return 'bg-blue-400';
      case 'Manager': return 'bg-emerald-400';
      case 'Viewer': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  }
}
