import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {
  ProfileUpdateDetailsRequest,
  RequestStatus,
} from '../../models/profile-update-request.model';
import { ProfileUpdateRequestService } from '../../services/profile-update-request.service';
import { ApiErrorHandler } from '../../../../../../shared/utils/api-error-handler.utils';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { FieldLabelPipe } from '../../../../../../shared/pipe/field-label.pipe';

@Component({
  selector: 'app-view-changes-modal',
  standalone: true,
  imports: [CommonModule, DatePipe, ModalHeaderComponent, FieldLabelPipe],
  templateUrl: './view-changes-modal.component.html',
  styleUrl: './view-changes-modal.component.scss',
})
export class ViewChangesModal {
  @Input() selectedRequest: ProfileUpdateDetailsRequest | null = null;

  @Output() processed = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  isProcessing = false;
  pendingAction: RequestStatus | null = null;

  constructor(
    private requestService: ProfileUpdateRequestService,
    private toastr: ToastrService,
  ) {}

  accept(): void {
    this.processRequest('APPROVED');
  }

  refuse(): void {
    this.processRequest('REJECTED');
  }

  private processRequest(status: RequestStatus): void {
    if (!this.selectedRequest) return;

    this.isProcessing = true;
    this.pendingAction = status;

    this.requestService
      .process(this.selectedRequest.requestId, status)
      .subscribe({
        next: () => {
          this.isProcessing = false;
          this.pendingAction = null;
          this.processed.emit();
        },
        error: (error: HttpErrorResponse) => {
          ApiErrorHandler.handle(error, this.toastr);
          this.isProcessing = false;
          this.pendingAction = null;
        },
      });
  }

  statusLabel(status: RequestStatus): string {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'APPROVED':
        return 'Acceptée';
      case 'REJECTED':
        return 'Refusée';
    }
  }
}
