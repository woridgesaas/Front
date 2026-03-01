import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';

// import { resignation } from '../../../shared/models/models';
import { ResignationApiService } from './services/resignation-api.service';

import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ConfirmDeleteComponent } from '../../common/delete-modal/delete-modal.component';
import { ResignationTableComponent } from './components/resignation-table/resignation-table.component';
import { ResignationFiltersComponent } from './components/resignation-filters/resignation-filters.component';
import { ResignationStatsComponent } from './components/resignation-stats/resignation-stats.component';
import { AddResignationModalComponent } from './components/resignation-modals/add-resignation-modal/add-resignation-modal.component';
import { EditResignationModalComponent } from './components/resignation-modals/edit-resignation-modal/edit-resignation-modal.component';
import { Resignation } from './models/models';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { ToastService } from '../../../shared/services/toast.service';
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
    ToastComponent,
  ],
})
export class ResignationComponent implements OnInit {

  resignations: Resignation[] = [];
  searchValue = '';
  dateRange?: Date[];
  openDeleteModal = false;
  openAddModal = false;
  openEditModal = false;
  selectedResignation?: Resignation;
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ResignationApiService, private toast: ToastService) {}

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
        this.errorMessage = 'Impossible de charger les données.';
        this.isLoading = false;
      }
    });
  }

  // ─── FILTRAGE ────────────────────────────────────────────
  get filteredResignations(): Resignation[] {
    return this.resignations.filter((r) =>
      r.userFullName?.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  // ─── ADD ─────────────────────────────────────────────────
  add(item: Resignation): void {
    this.apiService.create(item, item.cin!).subscribe({
        next: (created) => {
            this.resignations.unshift(created);
            this.openAddModal = false;
            this.toast.success('Démission ajoutée avec succès !');
        },
        error: (err) => {
            if (err.status === 409) {
              this.toast.warning('Cet employé a déjà une démission enregistrée !');
            } else {
              this.toast.error('Erreur lors de l\'ajout. Réessayez.');
            }
        }
    });
}

  // ─── EDIT ────────────────────────────────────────────────
  openEdit(item: Resignation): void {
    this.selectedResignation = item;
    this.openEditModal = true;
  }

  update(updated: Resignation): void {
    const id = this.selectedResignation?.id;
    if (!id) return;

    this.apiService.update(id, updated).subscribe({
      next: (result) => {
        const index = this.resignations.findIndex(r => r.id === id);
        if (index !== -1) this.resignations[index] = result;
        this.openEditModal = false;
        this.selectedResignation = undefined;
        this.toast.success('Démission modifiée avec succès !');
      },
      error: (err) => {
        console.error('Erreur modification:', err);
        this.toast.error('Erreur lors de la modification. Réessayez.');
      }
    });
  }

  // ─── DELETE ──────────────────────────────────────────────
  openDelete(item: Resignation): void {
    this.selectedResignation = item;
    this.openDeleteModal = true;
  }

  delete(): void {
    const id = this.selectedResignation?.id;
    if (!id) return;

    this.apiService.delete(id).subscribe({
      next: () => {
        this.resignations = this.resignations.filter(r => r.id !== id);
        this.selectedResignation = undefined;
        this.openDeleteModal = false;
        this.toast.success('Démission supprimée avec succès !');
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        this.toast.error('Erreur lors de la suppression. Réessayez.');
      }
    });
  }
  cancelDelete(): void {
    this.openDeleteModal = false;
    this.selectedResignation = undefined;
  }
}