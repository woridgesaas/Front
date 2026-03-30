import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sort } from '@angular/material/sort';

import { Promotion } from '../../../shared/models/models';
import { PromotionService } from '../../../shared/services/promotion-service';
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

constructor(private promotionService: PromotionService) {}
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
  this.promotionService.getAllPromotions().subscribe({
   next: (res: any) => {

  const data = res.data;
this.promotions = data.map((p: any) => ({
  id: p.id,
  CIN: p.basicUserInfo?.CIN ?? null,
  promotedEmployee: p.basicUserInfo?.fullName ?? '—',
  department: p.departmentName ?? '—',
  designationFrom: p.previousPostName ?? '—',
  designationTo: p.newPostName ?? '—',
  oldSalary: p.previousSalary ?? 0,
  newSalary: p.newSalary ?? 0,
  bonus: (p.newSalary ?? 0) - (p.previousSalary ?? 0),
  promotionDate: p.promotionDate
}));

      this.applyFilters();
    },
   
  });
}

    
  filteredPromotions: Promotion[] = [];

  applyFilters() {
    const search = this.searchValue.trim().toLowerCase();

    this.filteredPromotions = this.promotions.filter((p) => {
      const bySearch =
  !search ||
  (p.promotedEmployee || '').toLowerCase().includes(search) ||
  (p.department || '').toLowerCase().includes(search);

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
  this.openAddModal = false;
}


  // EDIT open
  openEdit(p: Promotion) {

  if (!p.CIN) {
    return;
  }

  this.promotionService.getEmployeeInfo(p.CIN).subscribe((res: any) => {

    this.selectedPromotion = {
      ...p,
    };

    this.openEditModal = true;
  });
}

  // EDIT save
updatePromotion(updated: Promotion) {

  if (!updated.id || !updated.newPostId) return;

  const payload = {
    promotionId: updated.id,
    newPostId: updated.newPostId,
    bonus: updated.bonus ?? 0,
    promotionDate: updated.promotionDate!
  };

  this.promotionService.updatePromotion(updated.id, payload)
    .subscribe(() => {
      this.loadPromotions();
      this.openEditModal = false;
    });
}



  
}
