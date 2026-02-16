import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { KpisComponent } from '../../../common/kpis/kpis.component';

type LeaveStatus = 'En attente' | 'Acceptée' | 'Refusée';

interface LeaveRequest {
  id: number;
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

  /* ================== DONNÉES ================== */

  leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      employeeName: 'Anthony Lewis',
      employeeRole: 'Finance',
      employeeImage: 'assets/img/users/user-01.jpg',
      requestDate: '2025-01-10',
      leaveType: 'Congé annuel',
      status: 'En attente',
    },
    {
      id: 2,
      employeeName: 'Brian Villalobos',
      employeeRole: 'Developer',
      employeeImage: 'assets/img/users/user-02.jpg',
      requestDate: '2025-01-11',
      leaveType: 'Congé maladie',
      status: 'Acceptée',
    },
    {
      id: 3,
      employeeName: 'Linda Ray',
      employeeRole: 'Finance',
      employeeImage: 'assets/img/users/user-03.jpg',
      requestDate: '2025-01-12',
      leaveType: 'Congé exceptionnel',
      status: 'Refusée',
    },
    {
      id: 4,
      employeeName: 'Doglas Martini',
      employeeRole: 'Manager',
      employeeImage: '', // pas d’image → avatar gris
      requestDate: '2025-01-13',
      leaveType: 'Congé annuel',
      status: 'En attente',
    },
  ];

  selectedDateRange: Date[] | null = null;

  bsConfig = {
    adaptivePosition: true,
    dateInputFormat: 'DD/MM/YYYY',
  };

  // 👉 liste affichée dans le tableau
  filteredRequests: LeaveRequest[] = [];

  /* ================== FILTRES ================== */

  searchTerm = '';
  selectedLeaveType = '';
  sortMode: 'recent' | 'asc' | 'desc' | '' = '';

  ngOnInit(): void {
    this.applyFilters();
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
    // POUR L’INSTANT : placeholder
    console.log('Voir justification de :', req);

    // PLUS TARD :
    // - ouvrir un modal
    // - router vers une page
    // - appeler une API
  }

  /* ================== FILTRAGE CENTRAL ================== */

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
      const term = this.searchTerm.trim().toLowerCase();
      data = data.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(term) ||
          r.leaveType.toLowerCase().includes(term) ||
          r.status.toLowerCase().includes(term)
      );
    }

    // 🎯 Type de congé
    if (this.selectedLeaveType) {
      data = data.filter((r) => r.leaveType === this.selectedLeaveType);
    }

    // 📅 Date range (FIX)
    if (this.selectedDateRange && this.selectedDateRange.length === 2) {
      const start = this.startOfDay(this.selectedDateRange[0]);
      const end = this.endOfDay(this.selectedDateRange[1]);

      data = data.filter((r) => {
        // r.requestDate est "YYYY-MM-DD" -> on force 00:00 local pour éviter soucis timezone
        const reqDate = new Date(`${r.requestDate}T00:00:00`);
        return reqDate >= start && reqDate <= end;
      });
    }

    // 🔃 Tri
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

  /* ================== HANDLERS UI ================== */

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
    return this.leaveRequests.filter((r) => r.status === 'En attente').length;
  }

  get accepted() {
    return this.leaveRequests.filter((r) => r.status === 'Acceptée').length;
  }

  get refused() {
    return this.leaveRequests.filter((r) => r.status === 'Refusée').length;
  }
  kpis = [
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
    value: this.accepted,
    icon: 'fa-solid fa-check',
    color: 'success',
  },
  {
    title: 'Refusées',
    value: this.refused,
    icon: 'fa-solid fa-xmark',
    color: 'danger',
  },
];

}
