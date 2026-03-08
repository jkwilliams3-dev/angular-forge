import { Component, inject, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, StatusBadgeComponent],
  template: `
    <header
      class="h-16 bg-slate-900 border-b border-slate-700 flex items-center px-4 lg:px-6 gap-4"
      role="toolbar"
      aria-label="Application header"
    >
      <!-- Hamburger menu (mobile) -->
      <button
        (click)="menuToggle.emit()"
        class="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Page title area -->
      <div class="flex-1">
        <h1 class="text-slate-200 font-semibold text-base">{{ pageTitle }}</h1>
      </div>

      <!-- Right side actions -->
      <div class="flex items-center gap-3" role="toolbar" aria-label="User actions">
        <!-- Notification bell -->
        <button
          class="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors relative"
          aria-label="Notifications (decorative)"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></span>
        </button>

        <!-- User menu -->
        @if (currentUser()) {
          <div class="flex items-center gap-2">
            <app-status-badge [status]="currentUser()!.role"></app-status-badge>
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white" [attr.aria-label]="'User: ' + currentUser()!.name">
              {{ currentUser()!.avatar }}
            </div>
          </div>
        }
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  get pageTitle(): string {
    return 'AngularForge';
  }
}
