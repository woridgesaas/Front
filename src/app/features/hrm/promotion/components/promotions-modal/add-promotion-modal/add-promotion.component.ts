import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Promotion } from '../../../../../../shared/models/models';
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

  /* ================= UI STATE ================= */
  isDeptOpen = false;
  isPostOpen = false;

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
    Finance: [
      'Senior Accountant',
      'Finance Manager',
      'Financial Controller',
    ],
    'Application Development': [
      'Senior App Developer',
      'Tech Lead',
      'Software Architect',
    ],
    'Web Development': [
      'Team Lead',
      'Senior Web Developer',
      'Project Manager',
    ],
    'UI / UX': [
      'Senior Designer',
      'UX Lead',
      'Product Designer',
    ],
    Marketing: [
      'Senior SEO Analyst',
      'Marketing Manager',
      'Growth Manager',
    ],
  };

  /* ================= METHODS ================= */

  selectDepartment(dept: string) {
    this.model.Department = dept;
    this.isDeptOpen = false;

    // reset poste
    this.model.DesignationTo = '';
    this.availablePositions = this.positionsByDepartment[dept] || [];
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

  onCancel() {
    this.cancel.emit();
  }

  submit() {
    this.model.PromotionDate = new Date().toLocaleDateString();

    this.submitPromotion.emit({ ...this.model });
    this.onCancel();

    // reset form
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

    this.availablePositions = [];
  }
}
