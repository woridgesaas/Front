import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Promotion } from '../../../../../../shared/models/models';
import { PromotionService } from '../../../../../../shared/services/promotion-service';
import { Post } from '../../../../models/post/post.model';
import { Department } from '../../../../../../shared/models/models';

import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { UserApiService } from '../../../../services/user/user-api.service';

@Component({
  selector: 'app-add-promotion-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent
  ],
  templateUrl: './add-promotion.component.html'
})
export class AddPromotionModalComponent implements OnInit {

  /* ================= INPUT / OUTPUT ================= */

  @Input() open = false;

  @Output() submitPromotion = new EventEmitter<Promotion>();
  @Output() cancel = new EventEmitter<void>();

  /* ================= DATA ================= */

  departments: Department[] = [];
  posts: Post[] = [];

  cin = '';
  loading = false;
  errorMessage = '';

  /* ================= UI STATE ================= */

  isDeptOpen = false;
  isPostOpen = false;

  /* ================= MODEL ================= */

  model: Promotion = {
    PromotedEmployee: '',
    Department: '',
    DesignationFrom: '',
    DesignationTo: '',
    OldSalary: 0,
    Bonus: 0,
    NewSalary: 0,
    PromotionDate: ''
  };

  constructor(
    private promotionService: PromotionService,
    private userApi: UserApiService
  ) {}

  /* ================= INIT ================= */

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPosts();
  }

  /* ================= LOAD DATA ================= */

  loadDepartments() {
    this.userApi.getDepartments().subscribe({
      next: (res) => this.departments = res,
      error: () => console.error('Erreur chargement departments')
    });
  }

  loadPosts() {
    this.userApi.getPosts().subscribe({
      next: (res) => this.posts = res,
      error: () => console.error('Erreur chargement posts')
    });
  }

  /* ================= FETCH EMPLOYEE ================= */

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

      error: () => {

        this.errorMessage = 'Employé introuvable';
        this.loading = false;

        this.model.PromotedEmployee = '';
        this.model.Department = '';
        this.model.DesignationFrom = '';
        this.model.OldSalary = 0;
        this.model.NewSalary = 0;
      }
    });
  }

  /* ================= SELECT ================= */

  selectDepartment(dept: string) {
    this.model.Department = dept;
    this.model.DesignationTo = '';
    this.isDeptOpen = false;
  }

  selectPosition(position: string) {
    this.model.DesignationTo = position;
    this.isPostOpen = false;
  }

  /* ================= SALARY ================= */

  calculateNewSalary() {
    this.model.NewSalary =
      (this.model.OldSalary || 0) + (this.model.Bonus || 0);
  }

  /* ================= SUBMIT ================= */

  submit() {

    if (!this.cin) return;

    this.loading = true;

    const payload = {
      cin: this.cin,
      bonus: this.model.Bonus || 0
    };

    this.promotionService.createPromotion(payload).subscribe({

      next: (res) => {

        const promotion: Promotion = {
          id: res.id,
          PromotedEmployee: res.fullName ?? '',
          Department: res.department ?? '',
          DesignationFrom: res.previousPost ?? '',
          DesignationTo: res.newPost ?? '',
          OldSalary: res.previousSalary ?? 0,
          Bonus: (res.newSalary ?? 0) - (res.previousSalary ?? 0),
          NewSalary: res.newSalary ?? 0,
          PromotionDate: res.promotionDate ?? ''
        };

        this.submitPromotion.emit(promotion);

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

  /* ================= ACTIONS ================= */

  onCancel() {
    this.cancel.emit();
  }

  private resetForm() {

    this.cin = '';

    this.model = {
      PromotedEmployee: '',
      Department: '',
      DesignationFrom: '',
      DesignationTo: '',
      OldSalary: 0,
      Bonus: 0,
      NewSalary: 0,
      PromotionDate: ''
    };
  }

}