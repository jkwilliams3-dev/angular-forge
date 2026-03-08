import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserRole, UserStatus } from '../../../core/models/user.model';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  template: `
    <app-modal
      [isOpen]="isOpen"
      [title]="user ? 'Edit User' : 'Create User'"
      size="md"
      (close)="cancel.emit()"
    >
      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <!-- Name -->
        <div class="mb-4">
          <label for="user-name" class="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
          <input
            id="user-name"
            type="text"
            formControlName="name"
            placeholder="Sarah Chen"
            [class]="fieldError('name') ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'"
            class="w-full px-3 py-2.5 bg-slate-900 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition"
            aria-label="Full name"
            [attr.aria-invalid]="fieldError('name') ? 'true' : 'false'"
            [attr.aria-describedby]="fieldError('name') ? 'name-error' : null"
          />
          @if (fieldError('name')) {
            <p id="name-error" class="mt-1.5 text-xs text-red-400" role="alert">{{ fieldError('name') }}</p>
          }
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="user-email" class="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
          <input
            id="user-email"
            type="email"
            formControlName="email"
            placeholder="sarah.chen@company.com"
            [class]="fieldError('email') ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'"
            class="w-full px-3 py-2.5 bg-slate-900 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition"
            aria-label="Email address"
            [attr.aria-invalid]="fieldError('email') ? 'true' : 'false'"
            [attr.aria-describedby]="fieldError('email') ? 'email-error' : null"
          />
          @if (fieldError('email')) {
            <p id="email-error" class="mt-1.5 text-xs text-red-400" role="alert">{{ fieldError('email') }}</p>
          }
        </div>

        <!-- Role + Department row -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label for="user-role" class="block text-sm font-medium text-slate-300 mb-1.5">Role</label>
            <select
              id="user-role"
              formControlName="role"
              [class]="fieldError('role') ? 'border-red-500' : 'border-slate-600'"
              class="w-full px-3 py-2.5 bg-slate-900 border rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              aria-label="User role"
            >
              <option value="" disabled>Select role</option>
              @for (role of roles; track role) {
                <option [value]="role">{{ role }}</option>
              }
            </select>
            @if (fieldError('role')) {
              <p class="mt-1.5 text-xs text-red-400" role="alert">{{ fieldError('role') }}</p>
            }
          </div>
          <div>
            <label for="user-department" class="block text-sm font-medium text-slate-300 mb-1.5">Department</label>
            <select
              id="user-department"
              formControlName="department"
              [class]="fieldError('department') ? 'border-red-500' : 'border-slate-600'"
              class="w-full px-3 py-2.5 bg-slate-900 border rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              aria-label="Department"
            >
              <option value="" disabled>Select dept.</option>
              @for (dept of departments; track dept) {
                <option [value]="dept">{{ dept }}</option>
              }
            </select>
            @if (fieldError('department')) {
              <p class="mt-1.5 text-xs text-red-400" role="alert">{{ fieldError('department') }}</p>
            }
          </div>
        </div>

        <!-- Status -->
        <div class="mb-6">
          <label for="user-status" class="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
          <select
            id="user-status"
            formControlName="status"
            [class]="fieldError('status') ? 'border-red-500' : 'border-slate-600'"
            class="w-full px-3 py-2.5 bg-slate-900 border rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            aria-label="User status"
          >
            <option value="" disabled>Select status</option>
            @for (st of statuses; track st) {
              <option [value]="st">{{ st }}</option>
            }
          </select>
          @if (fieldError('status')) {
            <p class="mt-1.5 text-xs text-red-400" role="alert">{{ fieldError('status') }}</p>
          }
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
          <button
            type="button"
            (click)="cancel.emit()"
            class="px-4 py-2 text-slate-400 hover:text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm font-medium"
            aria-label="Cancel and close dialog"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="loading"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            aria-label="Save user"
          >
            @if (loading) {
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            } @else {
              {{ user ? 'Save Changes' : 'Create User' }}
            }
          </button>
        </div>
      </form>
    </app-modal>
  `,
})
export class UserFormComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() user: User | null = null;
  @Input() loading = false;
  @Output() save = new EventEmitter<Partial<User>>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  roles: UserRole[] = ['Admin', 'Manager', 'Viewer'];
  statuses: UserStatus[] = ['Active', 'Inactive', 'Pending'];
  departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Operations', 'Legal', 'Design', 'Sales'];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['' as UserRole, Validators.required],
    department: ['', Validators.required],
    status: ['' as UserStatus, Validators.required],
  });

  ngOnChanges(): void {
    if (this.user) {
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        department: this.user.department,
        status: this.user.status,
      });
    } else {
      this.form.reset({ name: '', email: '', role: '' as UserRole, department: '', status: '' as UserStatus });
    }
  }

  fieldError(field: string): string {
    const ctrl = this.form.get(field);
    if (!ctrl?.touched || !ctrl.invalid) return '';
    if (ctrl.errors?.['required']) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    if (ctrl.errors?.['minlength']) return `Must be at least ${ctrl.errors['minlength'].requiredLength} characters.`;
    if (ctrl.errors?.['email']) return 'Please enter a valid email.';
    return '';
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.save.emit(this.form.value as Partial<User>);
  }
}
