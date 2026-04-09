import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { KpisComponent } from '../../../common/kpis/kpis.component';
import { LeaveApiService } from '../../../../shared/services/leave-api.service';

type LeaveStatus = 'En attente' | 'Acceptée' | 'Refusée';

interface LeaveRequest {
  id: string;
  employeeName: string;
  requestDate: string;
  employeeRole: string;
  employeeImage?: string;
  leaveType: string;
  status: LeaveStatus;
}

@Component({
  selector: 'app-validate-leave',
  standalone: true,
  templateUrl: './validate-leave.component.html',
  styleUrls: ['./validate-leave.component.scss'],
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    BreadcrumbsComponent,
    BsDatepickerModule,
    FooterComponent,
    KpisComponent,
  ],
})
export class ValidateLeaveComponent implements OnInit {

  constructor(private leaveApi: LeaveApiService) {}

  /* ================== DONNÉES ================== */

  isLoading = true;

  leaveRequests: LeaveRequest[] = [];
  filteredRequests: LeaveRequest[] = [];

  selectedDateRange: Date[] | null = null;

  /* ================== FORMAT ================== */

  mapLeaveType(type: string): string {
    switch (type) {
      case 'ANNUEL': return 'Congé annuel';
      case 'MALADIE': return 'Congé maladie';
      case 'EXCEPTIONNEL': return 'Congé exceptionnel';
      default: return type;
    }
  }

  mapStatus(status: string): LeaveStatus {
    switch (status) {
      case 'PENDING':
      case 'NEW':
        return 'En attente';
      case 'APPROVED':
        return 'Acceptée';
      case 'REJECTED':
        return 'Refusée';
      default:
        return 'En attente';
    }
  }

  formatRole(role: string): string {
    switch (role) {
      case 'EMPLOYEE': return 'Employé';
      case 'MANAGER': return 'Manager';
      default: return role;
    }
  }

  bsConfig = {
    adaptivePosition: true,
    dateInputFormat: 'DD/MM/YYYY',
  };

  /* ================== FILTRES ================== */

  searchTerm = '';
  selectedLeaveType = '';
  sortMode: 'recent' | 'asc' | 'desc' | '' = '';

  /* ================== INIT ================== */

  ngOnInit(): void {
    this.loadLeaves();
  }

  /* ================== API ================== */

  loadLeaves() {
    this.isLoading = true;

    this.leaveApi.getPendingLeaves().subscribe({
      next: (data: any[]) => {

        this.leaveRequests = data.map((l) => ({
          id: l.id,

          employeeName: l.employeeName || '—',
          employeeRole: this.formatRole(l.employeeRole),

          requestDate: l.startDate,

          leaveType: this.mapLeaveType(l.leaveType),
          status: this.mapStatus(l.status),

          employeeImage: ''
        }));

        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  /* ================== ACTIONS ================== */

  accept(req: LeaveRequest) {
    req.status = 'Acceptée';
    this.applyFilters();
  }

  refuse(req: LeaveRequest) {
    req.status = 'Refusée';
    this.applyFilters();
  }

  requiresJustification(type: string): boolean {
    return type === 'Congé maladie' || type === 'Congé exceptionnel';
  }

  viewJustification(req: LeaveRequest) {
    console.log('Voir justification de :', req);
  }

  /* ================== FILTRAGE ================== */

  private startOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  }

  private endOfDay(d: Date): Date {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      23,
      59,
      59,
      999
    );
  }

  applyFilters() {
    let data = [...this.leaveRequests];

    // 🔍 Search
    if (this.searchTerm?.trim()) {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(r =>
        r.employeeName.toLowerCase().includes(term) ||
        r.leaveType.toLowerCase().includes(term) ||
        r.status.toLowerCase().includes(term)
      );
    }

    // 🎯 Type
    if (this.selectedLeaveType) {
      data = data.filter(r => r.leaveType === this.selectedLeaveType);
    }

    // 📅 Date
    if (this.selectedDateRange?.length === 2) {
      const start = this.startOfDay(this.selectedDateRange[0]);
      const end = this.endOfDay(this.selectedDateRange[1]);

      data = data.filter(r => {
        const reqDate = new Date(`${r.requestDate}T00:00:00`);
        return reqDate >= start && reqDate <= end;
      });
    }

    // 🔃 Sort
    if (this.sortMode === 'asc') {
      data.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
    } else if (this.sortMode === 'desc') {
      data.sort((a, b) => b.employeeName.localeCompare(a.employeeName));
    } else if (this.sortMode === 'recent') {
      data.sort(
        (a, b) =>
          new Date(`${b.requestDate}T00:00:00`).getTime() -
          new Date(`${a.requestDate}T00:00:00`).getTime()
      );
    }

    this.filteredRequests = data;
  }

  /* ================== UI ================== */

  selectLeaveType(type: string) {
    this.selectedLeaveType = type;
    this.applyFilters();
  }

  sortBy(mode: 'recent' | 'asc' | 'desc') {
    this.sortMode = mode;
    this.applyFilters();
  }

  /* ================== STATS ================== */

  get total() {
    return this.leaveRequests.length;
  }

  get pending() {
    return this.leaveRequests.filter(r => r.status === 'En attente').length;
  }

  get accepted() {
    return this.leaveRequests.filter(r => r.status === 'Acceptée').length;
  }

  get refused() {
    return this.leaveRequests.filter(r => r.status === 'Refusée').length;
  }

  get kpis() {
    return [
      { title: 'Total des demandes', value: this.total, icon: 'fa-solid fa-file-lines', color: 'primary' },
      { title: 'En attente', value: this.pending, icon: 'fa-solid fa-clock', color: 'warning' },
      { title: 'Acceptées', value: this.accepted, icon: 'fa-solid fa-check', color: 'success' },
      { title: 'Refusées', value: this.refused, icon: 'fa-solid fa-xmark', color: 'danger' },
    ];
  }
}