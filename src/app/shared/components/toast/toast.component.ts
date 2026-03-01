import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999">
      <div *ngFor="let toast of toasts"
        class="toast show align-items-center text-white border-0 mb-2"
        [ngClass]="{
          'bg-success': toast.type === 'success',
          'bg-danger':  toast.type === 'error',
          'bg-warning': toast.type === 'warning'
        }">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i [ngClass]="{
              'ti ti-check':        toast.type === 'success',
              'ti ti-x':            toast.type === 'error',
              'ti ti-alert-triangle': toast.type === 'warning'
            }"></i>
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto"
            (click)="remove(toast)">
          </button>
        </div>
      </div>
    </div>
  `
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private sub!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.sub = this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.remove(toast), 3000); // ✅ disparaît après 3 secondes
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}