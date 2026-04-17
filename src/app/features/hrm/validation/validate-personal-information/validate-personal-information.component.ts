import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { KpisComponent } from '../../../common/kpis/kpis.component';
import { Subscription } from 'rxjs';
import { ProfileUpdateRequestService } from './services/profile-update-request.service';
import {
  ProfileUpdateDetailsRequest,
  ProfileUpdateSummaryRequest,
} from './models/profile-update-request.model';
import { SectionTypePipe } from '../../../../shared/pipe/section-type.pipe';
import { ApiErrorHandler } from '../../../../shared/utils/api-error-handler.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ViewChangesModal } from './modals/view-changes-modal/view-changes-modal.component';

@Component({
  selector: 'app-validate-personal-information',
  standalone: true,
  templateUrl: './validate-personal-information.component.html',
  styleUrls: ['./validate-personal-information.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    BsDatepickerModule,
    BreadcrumbsComponent,
    FooterComponent,
    KpisComponent,
    SectionTypePipe,
    ViewChangesModal,
  ],
})
export class ValidatePersonalInformationComponent implements OnInit, OnDestroy {
  requests: ProfileUpdateSummaryRequest[] = [];
  filteredRequests: ProfileUpdateSummaryRequest[] = [];
  selectedRequest: ProfileUpdateDetailsRequest | null = null;

  isLoading = false;
  isLoadingDetails = false;
  isModalOpen = false;

  errorMessage: string | null = null;

  searchTerm = '';
  selectedDateRange: Date[] | null = null;
  sortMode: 'recent' | 'asc' | 'desc' = 'recent';

  bsConfig = {
    adaptivePosition: true,
    rangeInputFormat: 'DD/MM/YYYY',
    displayMonths: 2,
  };

  private subscription?: Subscription;

  constructor(
    private requestService: ProfileUpdateRequestService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadRequests(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.subscription = this.requestService.getAll().subscribe({
      next: (data) => {
        this.requests = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        ApiErrorHandler.handle(error, this.toastr);
        this.isLoading = false;
      },
    });
  }

  applyFilters(): void {
    let data = [...this.requests];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(
        (r) =>
          r.employeeFullName.toLowerCase().includes(term) ||
          r.sectionType.toLowerCase().includes(term) ||
          r.status.toLowerCase().includes(term),
      );
    }

    if (this.selectedDateRange?.length === 2) {
      const [start, end] = this.selectedDateRange;
      data = data.filter((r) => {
        const d = new Date(r.requestedAt);
        return d >= start && d <= end;
      });
    }

    if (this.sortMode === 'asc') {
      data.sort((a, b) => a.employeeFullName.localeCompare(b.employeeFullName));
    } else if (this.sortMode === 'desc') {
      data.sort((a, b) => b.employeeFullName.localeCompare(a.employeeFullName));
    } else {
      data.sort(
        (a, b) =>
          new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime(),
      );
    }

    this.filteredRequests = data;
  }

  sortBy(mode: 'recent' | 'asc' | 'desc'): void {
    this.sortMode = mode;
    this.applyFilters();
  }

  viewDetails(req: ProfileUpdateSummaryRequest): void {
    this.selectedRequest = null;
    this.isLoadingDetails = true;
    this.isModalOpen = true;

    this.requestService.getDetails(req.requestId).subscribe({
      next: (details) => {
        this.selectedRequest = details;
        this.isLoadingDetails = false;
      },
      error: (error: HttpErrorResponse) => {
        ApiErrorHandler.handle(error, this.toastr);
        this.isLoadingDetails = false;
        this.isModalOpen = false;
      },
    });
  }

  onProcessed(): void {
    this.isModalOpen = false;
    this.loadRequests();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'APPROVED':
        return 'Acceptée';
      case 'REJECTED':
        return 'Refusée';
      default:
        return status;
    }
  }

  getSectionClass(section: string): string {
    switch (section) {
      case 'PERSONAL_INFORMATION':
        return 'bg-primary-subtle text-primary';
      case 'BANK_INFORMATION':
        return 'bg-info-subtle text-info';
      case 'EDUCATION':
        return 'bg-warning-subtle text-warning';
      case 'PROFESSIONAL_EXPERIENCE':
        return 'bg-success-subtle text-success';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }

  getSectionIcon(section: string): string {
    switch (section) {
      case 'PERSONAL_INFORMATION':
        return 'ti ti-user';
      case 'BANK_INFORMATION':
        return 'ti ti-building-bank';
      case 'EDUCATION':
        return 'ti ti-school';
      case 'PROFESSIONAL_EXPERIENCE':
        return 'ti ti-briefcase';
      default:
        return 'ti ti-file';
    }
  }

  get total(): number {
    return this.requests.length;
  }

  get pending(): number {
    return this.requests.filter((r) => r.status === 'PENDING').length;
  }

  get approved(): number {
    return this.requests.filter((r) => r.status === 'APPROVED').length;
  }

  get rejected(): number {
    return this.requests.filter((r) => r.status === 'REJECTED').length;
  }

  get kpis() {
    return [
      {
        title: 'Total des demandes',
        value: this.total,
        icon: 'fa-solid fa-file-lines',
        color: 'primary',
      },
      {
        title: 'En attente',
        value: this.pending,
        icon: 'fa-solid fa-clock',
        color: 'warning',
      },
      {
        title: 'Acceptées',
        value: this.approved,
        icon: 'fa-solid fa-check',
        color: 'success',
      },
      {
        title: 'Refusées',
        value: this.rejected,
        icon: 'fa-solid fa-xmark',
        color: 'danger',
      },
    ];
  }
}
