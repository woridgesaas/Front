import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Promotion } from '../../../../../../shared/models/models';
import { PromotionService } from '../../../../../../shared/services/promotion-service';

import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';

@Component({
  selector: 'app-add-promotion-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
  templateUrl: './add-promotion.component.html',
})
export class AddPromotionModalComponent {

  /* ================= INPUT / OUTPUT ================= */

  @Input() open = false;
  @Input() departments: { Department: string }[] = [];

  @Output() submitPromotion = new EventEmitter<Promotion>();
  @Output() cancel = new EventEmitter<void>();
errorMessage = '';
  constructor(private promotionService: PromotionService) {}

  /* ================= UI STATE ================= */

  isDeptOpen = false;
  isPostOpen = false;
  loading = false;

  /* ================= DATA ================= */

  cin = '';
  availablePositions: string[] = [];

  model: Promotion = {
    PromotedEmployee: '',
    Department: '',
    DesignationFrom: '',
    DesignationTo: '',
    OldSalary: 0,
    Bonus: 0,
    NewSalary: 0,
    PromotionDate: '',
  };

  /* ================= STATIC DATA ================= */

  positionsByDepartment: Record<string, string[]> = {
    Finance: ['Senior Accountant', 'Finance Manager', 'Financial Controller'],
    'Application Development': ['Senior App Developer', 'Tech Lead', 'Software Architect'],
    'Web Development': ['Team Lead', 'Senior Web Developer', 'Project Manager'],
    'UI / UX': ['Senior Designer', 'UX Lead', 'Product Designer'],
    Marketing: ['Senior SEO Analyst', 'Marketing Manager', 'Growth Manager'],
  };

  /* ================= METHODS ================= */

 fetchEmployee() {
  if (!this.cin) return;

  this.loading = true;
  this.errorMessage = '';

  this.promotionService.getEmployeeInfo(this.cin).subscribe({
    next: (res) => {
      this.model.PromotedEmployee = res.fullName;
      this.model.Department = res.departmentName;
      this.model.DesignationFrom = res.currentPost;
      this.model.OldSalary = res.currentSalary;
      this.calculateNewSalary();
      this.loading = false;
    },
    error: (err) => {
      this.errorMessage = 'Employé introuvable';
      this.loading = false;

      // Reset champs
      this.model.PromotedEmployee = '';
      this.model.Department = '';
      this.model.DesignationFrom = '';
      this.model.OldSalary = 0;
      this.model.NewSalary = 0;
    }
  });
}

  selectDepartment(dept: string) {
    this.model.Department = dept;
    this.model.DesignationTo = '';
    this.availablePositions = this.positionsByDepartment[dept] || [];
    this.isDeptOpen = false;
    this.isPostOpen = false;
  }

  selectPosition(position: string) {
    this.model.DesignationTo = position;
    this.isPostOpen = false;
  }

  calculateNewSalary() {
    this.model.NewSalary =
      (this.model.OldSalary || 0) + (this.model.Bonus || 0);
  }

  submit() {
if (!this.cin) return;
    this.loading = true;

    const payload = {
      cin: this.cin,
      bonus: this.model.Bonus || 0,
    };

    this.promotionService.createPromotion(payload).subscribe({
      next: (res) => {

       const mappedPromotion: Promotion = {
  id: res.id,
  PromotedEmployee: res.fullName ?? '',
  Department: res.department ?? '',
  DesignationFrom: res.previousPost ?? '',
  DesignationTo: res.newPost ?? '',
  OldSalary: res.previousSalary ?? 0,
  Bonus: (res.newSalary ?? 0) - (res.previousSalary ?? 0),
  NewSalary: res.newSalary ?? 0,
  PromotionDate: res.promotionDate ?? '',
};

        this.submitPromotion.emit(mappedPromotion);

        this.resetForm();
        this.onCancel();
        this.loading = false;
      },
      error: () => {
        alert('Erreur lors de la promotion');
        this.loading = false;
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  private resetForm() {
    this.cin = '';
    this.availablePositions = [];

    this.model = {
      PromotedEmployee: '',
      Department: '',
      DesignationFrom: '',
      DesignationTo: '',
      OldSalary: 0,
      Bonus: 0,
      NewSalary: 0,
      PromotionDate: '',
    };
  }
}