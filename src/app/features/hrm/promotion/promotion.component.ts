import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sort } from '@angular/material/sort';

import { Promotion } from '../../../shared/models/models';
import { DataService } from '../../../shared/data/data.service';

import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../common/footer/footer.component';

import { PromotionsStatsComponent } from './components/promotions-stats/promotion-stats.component';
import { PromotionsFiltersComponent } from './components/promotions-filters/promotion-filters.component';
import { PromotionsTableComponent } from './components/promotions-table/promotion-table.component';

import { ConfirmDeleteComponent } from '../../common/delete-modal/delete-modal.component';
import { AddPromotionModalComponent } from './components/promotions-modal/add-promotion-modal/add-promotion.component';
import { EditPromotionModalComponent } from './components/promotions-modal/edit-promotion-modal/edit-promotion.component';

@Component({
  selector: 'app-promotions',
  standalone: true,
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    FooterComponent,
    PromotionsStatsComponent,
    PromotionsFiltersComponent,
    PromotionsTableComponent,
    ConfirmDeleteComponent,
    AddPromotionModalComponent,
    EditPromotionModalComponent,
  ],
})
export class PromotionsComponent implements OnInit {
  promotions: Promotion[] = [];

  selectedPromotion: Promotion | null = null;
  selectedItem!: Promotion;

  searchValue = '';
  dateRange: Date[] = [];
  departments: { Department: string }[] | undefined;

  openAddModal = false;
  openEditModal = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPromotions();
        this.loadDepartments();

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
  loadPromotions() {
    this.dataService.getpromotion().subscribe((res: any) => {
      this.promotions = res.data || [];
      this.applyFilters();
    });
  }

  filteredPromotions: Promotion[] = [];

  applyFilters() {
    const search = this.searchValue.trim().toLowerCase();

    this.filteredPromotions = this.promotions.filter((p) => {
      const bySearch =
        !search ||
        (p.PromotedEmployee || '').toLowerCase().includes(search) ||
        (p.Department || '').toLowerCase().includes(search);

      // (Optionnel) filtre dateRange si tu veux l’activer plus tard
      return bySearch;
    });
  }

  // SORT comme departments
  sortData(sort: Sort) {
    const data = [...this.filteredPromotions];

    if (!sort.active || sort.direction === '') {
      this.filteredPromotions = data;
      return;
    }

    this.filteredPromotions = data.sort((a, b) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];
      return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    });
  }

  // ADD
 addPromotion(promotion: Promotion) {
  this.promotions.unshift(promotion);
  this.applyFilters();
}


  // EDIT open
  openEdit(p: Promotion) {
    this.selectedPromotion = { ...p };
    this.openEditModal = true;
  }

  // EDIT save
updatePromotion(updated: Promotion) {
  const index = this.promotions.findIndex(
    p => p === this.selectedPromotion
  );

  if (index !== -1) {
    this.promotions[index] = updated;
    this.applyFilters();
  }
}


  // DELETE open (set selectedItem)
 openDelete(p: Promotion) {
  this.selectedItem = { ...p };
}

  // DELETE confirm
  deleteItem() {
    this.promotions = this.promotions.filter((p) => p !== this.selectedItem);
    this.applyFilters();
  }
}
