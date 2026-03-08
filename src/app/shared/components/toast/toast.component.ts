import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div
      class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80"
      aria-live="polite"
      aria-label="Notifications"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          [class]="toastClass(toast.type)"
          class="flex items-start gap-3 p-4 rounded-lg shadow-lg border animate-fade-in"
          role="alert"
        >
          <span class="text-lg leading-none mt-0.5">{{ icon(toast.type) }}</span>
          <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
          <button
            (click)="toastService.dismiss(toast.id)"
            class="text-current opacity-60 hover:opacity-100 transition-opacity ml-auto"
            aria-label="Dismiss notification"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.25s ease-out;
    }
  `],
})
export class ToastComponent {
  toastService = inject(ToastService);

  toastClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-emerald-900 border-emerald-700 text-emerald-200';
      case 'error': return 'bg-red-900 border-red-700 text-red-200';
      case 'warning': return 'bg-amber-900 border-amber-700 text-amber-200';
      default: return 'bg-blue-900 border-blue-700 text-blue-200';
    }
  }

  icon(type: string): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  }
}
