import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { Justification } from '../../../../shared/models/models';
import { JustificationStatsComponent } from './components/justification-stats/justification-stats.component';
import { JustificationFiltersComponent } from './components/justification-filters/justification-filters.component';
import { JustificationTableComponent } from './components/justification-table/justification-table.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-validate-justification',
  templateUrl: './validate-Justification.component.html',
  styleUrls: ['./validate-justification.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbsComponent,
    FooterComponent,
    JustificationStatsComponent,
    JustificationFiltersComponent,
    JustificationTableComponent,
  ],
})
export class ValidateJustificationComponent implements OnInit {
  employees: Justification[] = [];
  departments: { Department: string }[] = [];
  bsRangeValue?: Date[];
  allEmployees: Justification[] = [];
  searchTerm = '';
  selectedDepartment?: string;
  constructor(private http: HttpClient, private router: Router) {}

  goToProfile(emp: Justification) {
    this.router.navigate(['/employees/employee-details'], {
      queryParams: { id: emp.EmpId },
    });
  }
  applyFilters() {
    let data = [...this.allEmployees];

    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      data = data.filter(
        (emp) =>
          emp.Name.toLowerCase().includes(t) ||
          emp.Designation.toLowerCase().includes(t) ||
          emp.Status.toLowerCase().includes(t)
      );
    }

    this.employees = data;
  }

  onSearch(value: string) {
    this.searchTerm = value;
    this.applyFilters();
  }
  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }
  // ======================
  // Chargement employés
  // ======================
  loadEmployees() {
    this.http.get<any>('assets/json/employee-grid.json').subscribe((res) => {
      this.allEmployees = res.data;
      this.employees = [...this.allEmployees];
    });
  }

  filterByDepartment(dept: string) {
    this.selectedDepartment = dept;

    //  Tous les départements
    if (dept === 'ALL') {
      this.employees = [...this.allEmployees];
      return;
    }

    // Filtre normal
    this.employees = this.allEmployees.filter((e) => e.Designation === dept);
  }

  loadDepartments() {
    this.departments = [
      { Department: 'Finance' },
      { Department: 'Développement d’applications' },
      { Department: 'Gestion informatique' },
      { Department: 'Développement Web' },
      { Department: 'Ventes' },
      { Department: 'UI / UX' },
      { Department: 'Gestion des comptes' },
      { Department: 'Marketing' },
      { Department: 'Administration' },
      { Department: 'Développement commercial' },
    ];
  }

  validate(j: Justification) {
    j.Status = 'Accepter';
  }

  refuse(j: Justification) {
    j.Status = 'Refuser';
  }

  downloadDocument(j: Justification) {}
}
