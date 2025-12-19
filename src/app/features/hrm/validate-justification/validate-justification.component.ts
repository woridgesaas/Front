import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { CollapseHeaderComponent } from '../../common/collapse-header/collapse-header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { routes } from '../../../shared/routes/routes';


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
  CollapseHeaderComponent,
  FooterComponent
],

})
export class ValidateJustificationComponent implements OnInit {
bsRangeValue?: Date[];

  employees: any[] = [];
  departments: any[] = [];
  public routes = routes;
breadCrumbItems = [
  { label: 'Accueil', link: '/' },
  { label: 'RH Interne', link: '/hrm' },
  { label: 'Justifications', active: true }
];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }

  // ======================
  // Chargement employés
  // ======================
  loadEmployees() {
    this.http.get<any>('assets/json/employee-grid.json').subscribe({
      next: (res) => {
        this.employees = res.data;
      },
      error: (err) => {
        console.error('Erreur chargement employés', err);
      }
    });
  }

  // ======================
  // Chargement départements
  // ======================
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
      { Department: 'Développement commercial' }
    ];
  }

  // ======================
  // Actions
  // ======================
  downloadDocument(emp: any) {
    if (!emp.Document) {
      alert('Aucun document disponible');
      return;
    }

    const fileUrl = `assets/docs/${emp.Document}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = emp.Document.split('/').pop();
    link.click();
  }

  validate(emp: any) {
    emp.Status = 'Validée';
  }

  refuse(emp: any) {
    emp.Status = 'Refusée';
  }
  selectedEmployee: any = null;

openRefuseModal(emp: any) {
  this.selectedEmployee = emp;
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('confirmRefuseModal')
  );
  modal.show();
}

confirmRefuse() {
  if (this.selectedEmployee) {
    this.selectedEmployee.Status = 'Refusée';
  }

  const modalEl = document.getElementById('confirmRefuseModal');
  const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}

}
