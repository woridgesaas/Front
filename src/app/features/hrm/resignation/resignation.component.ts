import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';

import { resignation } from '../../../shared/models/models';
import { ResignationApiService } from './services/resignation-api.service';

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
  isLoading = false;
  errorMessage = '';

  departments: { Department: string }[] = [
    { Department: 'Finance' },
    { Department: 'Developpement applications' },
    { Department: 'Gestion informatique' },
    { Department: 'Developpement Web' },
    { Department: 'Ventes' },
    { Department: 'UI / UX' },
    { Department: 'Gestion des comptes' },
    { Department: 'Marketing' },
    { Department: 'Administration' },
    { Department: 'Developpement commercial' },
  ];

  // ← On injecte ResignationApiService (plus DataService ni HttpClient directement)
  constructor(private apiService: ResignationApiService) {}

  ngOnInit(): void {
    this.loadResignations();
  }

  // ─── CHARGEMENT ──────────────────────────────────────────
  loadResignations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getAll().subscribe({
      next: (data) => {
        this.resignations = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement:', err);
        this.errorMessage = 'Impossible de charger les donnees. Verifiez que le backend tourne.';
        this.isLoading = false;
      }
    });
  }

  // ─── FILTRAGE ────────────────────────────────────────────
  get filteredResignations(): resignation[] {
    return this.resignations.filter((r) =>
      r.ResigningEmployee.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  // ─── ADD ─────────────────────────────────────────────────
  add(item: resignation): void {
    this.apiService.create(item).subscribe({
      next: (created) => {
        this.resignations.unshift(created);  // Ajoute en haut de la liste
        this.openAddModal = false;
      },
      error: (err) => {
        console.error('Erreur ajout:', err);
        alert('Erreur lors de l\'ajout. Reessayez.');
      }
    });
  }

  // ─── EDIT ────────────────────────────────────────────────
  openEdit(item: resignation): void {
    this.selectedResignation = item;
    this.openEditModal = true;
  }

  update(updated: resignation): void {
    const id = this.selectedResignation?.sNo;
    if (!id) return;

    this.apiService.update(id, updated).subscribe({
      next: (result) => {
        const index = this.resignations.findIndex(r => r.sNo === id);
        if (index !== -1) this.resignations[index] = result;
        this.openEditModal = false;
        this.selectedResignation = undefined;
      },
      error: (err) => {
        console.error('Erreur modification:', err);
        alert('Erreur lors de la modification. Reessayez.');
      }
    });
  }

  // ─── DELETE ──────────────────────────────────────────────
  openDelete(item: resignation): void {
    this.selectedResignation = item;
    this.openDeleteModal = true;
  }

  delete(): void {
    const id = this.selectedResignation?.sNo;
    if (!id) return;

    this.apiService.delete(id).subscribe({
      next: () => {
        this.resignations = this.resignations.filter(r => r.sNo !== id);
        this.selectedResignation = undefined;
        this.openDeleteModal = false;
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        alert('Erreur lors de la suppression. Reessayez.');
      }
    });
  }
}