import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { resignation } from '../../../shared/models/models';
import { DataService } from '../../../shared/data/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ConfirmDeleteComponent } from '../../common/delete-modal/delete-modal.component';

import { ResignationTableComponent } from './components/resignation-table/resignation-table.component';
import { ResignationFiltersComponent } from './components/resignation-filters/resignation-filters.component';
import { ResignationStatsComponent } from './components/resignation-stats/resignation-stats.component';
import { AddResignationModalComponent } from './components/resignation-modals/add-resignation-modal/add-resignation-modal.component';
import { EditResignationModalComponent } from './components/resignation-modals/edit-resignation-modal/edit-resignation-modal.component';

@Component({
  selector: 'app-resignation',
  standalone: true,
  templateUrl: './resignation.component.html',
  styleUrl: './resignation.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbsComponent,
    FooterComponent,
    HttpClientModule,
    ConfirmDeleteComponent,
    ResignationTableComponent,
    ResignationFiltersComponent,
    ResignationStatsComponent,
    AddResignationModalComponent,
    EditResignationModalComponent,
  ],
})
export class ResignationComponent implements OnInit {
  resignations: resignation[] = [];
  searchValue = '';
  dateRange?: Date[];
  openDeleteModal = false;

  openAddModal = false;
  openEditModal = false;
  selectedResignation?: resignation;
  departments: { Department: string }[] | undefined;

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadResignationsFromJson();
    this.loadDepartments();
  }

  private parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  loadResignationsFromJson(): void {
    this.http
      .get<{ data: any[] }>('assets/json/resignation.json')
      .subscribe({
        next: (response) => {
          
          this.resignations = response.data.map((r: any, index: number) => ({
            sNo: r.sNo || index + 1,
            resignation: null,
            isSelected: false,
            Image: r.Image || 'user-default.jpg',
            ResigningEmployee: r.ResigningEmployee || '',
            Department: r.Department || '',
            Reason: r.Reason || '',
            NoticeDate: this.parseDate(r.NoticeDate),
            ResignationDate: this.parseDate(r.ResignationDate),
          }));
        },
        error: (err) => {
          console.error(' Erreur chargement JSON:', err);
          // Charger les données de fallback si le JSON échoue
          this.loadResignations();
        }
      });
  }

  loadResignations(): void {
    this.dataService.getresignation().subscribe((res) => {
      this.resignations = res.data;
    });
  }

  /** FILTRAGE CENTRALISÉ */
  get filteredResignations(): resignation[] {
    return this.resignations.filter((r) =>
      r.ResigningEmployee.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  /** CRUD */
  add(item: resignation) {
    this.resignations.unshift(item);
  }

  openEdit(item: resignation) {
    this.selectedResignation = item;
    this.openEditModal = true;
  }

  update(updated: resignation) {
    const i = this.resignations.indexOf(this.selectedResignation!);
    if (i !== -1) this.resignations[i] = updated;
  }

  openDelete(item: resignation) {
    this.selectedResignation = item;
    this.openDeleteModal = true;
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


  delete() {
    if (!this.selectedResignation) return;

    this.resignations = this.resignations.filter(
      (r) => r.sNo !== this.selectedResignation!.sNo
    );

    this.selectedResignation = undefined;
    this.openDeleteModal = false;
  }
}