import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="titleId"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          (click)="onBackdropClick()"
          aria-hidden="true"
        ></div>

        <!-- Modal panel -->
        <div
          #modalPanel
          [class]="sizeClass"
          class="relative bg-slate-800 border border-slate-700 rounded-xl shadow-2xl flex flex-col max-h-[90vh] w-full"
          tabindex="-1"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
            <h2 [id]="titleId" class="text-lg font-semibold text-slate-100">{{ title }}</h2>
            <button
              (click)="close.emit()"
              class="text-slate-400 hover:text-slate-200 transition-colors rounded-lg p-1 hover:bg-slate-700"
              aria-label="Close dialog"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalComponent implements OnChanges, AfterViewInit {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalPanel') modalPanel!: ElementRef<HTMLElement>;

  readonly titleId = `modal-title-${Math.random().toString(36).slice(2)}`;

  get sizeClass(): string {
    switch (this.size) {
      case 'sm': return 'max-w-sm';
      case 'lg': return 'max-w-2xl';
      default: return 'max-w-lg';
    }
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      setTimeout(() => this.modalPanel?.nativeElement?.focus(), 50);
    }
  }

  ngAfterViewInit(): void {
    if (this.isOpen) {
      setTimeout(() => this.modalPanel?.nativeElement?.focus(), 50);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    if (event.key === 'Escape') {
      this.close.emit();
      return;
    }

    if (event.key === 'Tab' && this.modalPanel) {
      const focusable = this.modalPanel.nativeElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusableArr = Array.from(focusable);
      if (focusableArr.length === 0) return;

      const first = focusableArr[0];
      const last = focusableArr[focusableArr.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }

  onBackdropClick(): void {
    this.close.emit();
  }
}
