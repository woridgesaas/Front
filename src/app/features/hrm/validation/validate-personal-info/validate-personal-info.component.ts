import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';

type Status = 'En attente' | 'Acceptée' | 'Refusée';

interface PersonalInfoRequest {
  id: number;
  employeeName: string;
  employeeRole: string;
  employeeImage?: string;
  modifiedDate: string;
  status: Status;
}

@Component({
  selector: 'app-validate-personal-info',
  standalone: true,
  templateUrl: './validate-personal-info.component.html',
  styleUrls: ['./validate-personal-info.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    BsDatepickerModule,
    BreadcrumbsComponent,
    FooterComponent,
  ],
})
export class ValidateInfoPersonnelComponent implements OnInit {
  requests: PersonalInfoRequest[] = [
    {
      id: 1,
      employeeName: 'Anthony Lewis',
      employeeRole: 'Finance',
      employeeImage: '',
      modifiedDate: '2025-12-15',
      status: 'En attente',
    },
    {
      id: 2,
      employeeName: 'Sofia Martin',
      employeeRole: 'RH',
      employeeImage: 'assets/img/users/user-04.jpg',
      modifiedDate: '2025-12-10',
      status: 'Acceptée',
    },
    {
      id: 3,
      employeeName: 'erwan ertoo',
      employeeRole: 'manager',
      employeeImage: 'assets/img/users/user-04.jpg',
      modifiedDate: '2025-12-10',
      status: 'Refusée',
    },
  ];

  filteredRequests: PersonalInfoRequest[] = [];

  searchTerm = '';
  selectedDateRange: Date[] | null = null;
  sortMode: 'recent' | 'asc' | 'desc' = 'recent';

  bsConfig = {
    adaptivePosition: true,
    rangeInputFormat: 'DD/MM/YYYY',
    displayMonths: 2,
  };

  statusClass(status: string): string {
    switch (status) {
      case 'En attente':
        return 'status-warning';
      case 'Acceptée':
        return 'status-success';
      case 'Refusée':
        return 'status-danger';
      default:
        return '';
    }
  }

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    let data = [...this.requests];

    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      data = data.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(t) ||
          r.employeeRole.toLowerCase().includes(t) ||
          r.status.toLowerCase().includes(t)
      );
    }

    if (this.selectedDateRange?.length === 2) {
      const [start, end] = this.selectedDateRange;
      data = data.filter((r) => {
        const d = new Date(`${r.modifiedDate}T00:00:00`);
        return d >= start && d <= end;
      });
    }

    if (this.sortMode === 'asc') {
      data.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
    } else if (this.sortMode === 'desc') {
      data.sort((a, b) => b.employeeName.localeCompare(a.employeeName));
    } else {
      data.sort(
        (a, b) =>
          new Date(b.modifiedDate).getTime() -
          new Date(a.modifiedDate).getTime()
      );
    }

    this.filteredRequests = data;
  }

  sortBy(mode: 'recent' | 'asc' | 'desc') {
    this.sortMode = mode;
    this.applyFilters();
  }

  accept(r: PersonalInfoRequest) {
    r.status = 'Acceptée';
    this.applyFilters();
  }

  refuse(r: PersonalInfoRequest) {
    r.status = 'Refusée';
    this.applyFilters();
  }

  viewChanges(req: any) {
    console.log('Voir les modifications:', req);

    // ✅ plus tard quand ça devient dynamique :
    // this.router.navigate(['/validation/personal-info-details', req.id]);
    // ou ouvrir un modal avec req.changes
  }

  get total() {
    return this.requests.length;
  }
  get pending() {
    return this.requests.filter((r) => r.status === 'En attente').length;
  }
  get accepted() {
    return this.requests.filter((r) => r.status === 'Acceptée').length;
  }
  get refused() {
    return this.requests.filter((r) => r.status === 'Refusée').length;
  }
}
