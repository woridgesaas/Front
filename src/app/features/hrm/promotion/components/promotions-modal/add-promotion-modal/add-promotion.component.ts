import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Promotion } from '../../../../../../shared/models/models';
import { PromotionService } from '../../../../../../shared/services/promotion-service';
import { Post } from '../../../../models/post/post.model';
import { Department } from '../../../../../../shared/models/models';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { UserApiService } from '../../../../services/user/user-api.service';

@Component({
  selector: 'app-add-promotion-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ModalHeaderComponent,
    ModalFooterComponent
  ],
  templateUrl: './add-promotion.component.html'
})
export class AddPromotionModalComponent implements OnInit {

  cinChanged = new Subject<string>();

  @Input() open = false;
  @Output() submitPromotion = new EventEmitter<Promotion>();
  @Output() cancel = new EventEmitter<void>();

  /* ================= DATE ================= */
  promotionDate: Date = new Date();

  /* ================= DATA ================= */

  departments: Department[] = [];
  posts: Post[] = [];

  cin = '';
  loading = false;
  errorMessage = '';

  /* ================= UI ================= */

  isDeptOpen = false;
  isPostOpen = false;

  /* ================= MODEL ================= */

  model: Promotion = {
    promotedEmployee: '',
    department: '',
    designationFrom: '',
    designationTo: '',
    oldSalary: 0,
    bonus: 0,
    newSalary: 0,
    promotionDate: ''
  };

  constructor(
    private promotionService: PromotionService,
    private userApi: UserApiService
  ) {}

  ngOnInit() {
  this.loadDepartments(); // ✅
  this.loadPosts();       // ✅

  this.cinChanged.pipe(
    debounceTime(500)
  ).subscribe(cin => {
    this.fetchEmployee(cin);
  });
}
  loadDepartments() {
    this.userApi.getDepartments().subscribe({
      next: (res) => this.departments = res,
    });
  }

  loadPosts() {
  this.userApi.getPosts().subscribe({
    next: (res: any) => {
      this.posts = res.data || []; // ✅ IMPORTANT
    },
  });
}

  /* ================= FETCH ================= */

  fetchEmployee(cin?: string) {

  const value = cin || this.cin;

  if (!value) {
    this.resetForm();
    return;
  }

  if (value.length < 4) return;

  this.loading = true;
  this.errorMessage = '';

  this.promotionService.getEmployeeInfo(value).subscribe({
next: (res: any) => {

  const data = res?.data;

  if (!data) {
    this.errorMessage = 'Données invalides';
    this.loading = false;
    return;
  }

  this.model.promotedEmployee = data.fullName ?? '';
  this.model.department = data.departmentName ?? '';

  // ✅ FIX ICI
  this.model.designationFrom = data.currentPost ?? '';
  this.model.designationTo = data.currentPost ?? '';

  this.model.oldSalary = data.currentSalary ?? 0;

  this.calculateNewSalary();
  this.loading = false;
},

    error: () => {
      this.errorMessage = 'Employé introuvable';
      this.loading = false;
      this.resetForm();
    }
  });
}

  /* ================= SELECT ================= */

  selectDepartment(dept: string) {
    this.model.department = dept;
    this.model.designationTo = '';
    this.isDeptOpen = false;
  }

  selectPosition(position: string) {
    this.model.designationTo = position;
    this.isPostOpen = false;
  }

  /* ================= SALARY ================= */

  calculateNewSalary() {
    this.model.newSalary =
      (this.model.oldSalary || 0) + (this.model.bonus || 0);
  }

  /* ================= SUBMIT ================= */

  submit() {

    if (!this.cin) return;

    const selectedPost = this.posts.find(
  p => p.name.trim() === this.model.designationTo?.trim()
);

const finalPost = selectedPost || this.posts.find(
  p => p.name === this.model.designationFrom
);

if (!finalPost) {
  alert('Post introuvable');
  return;
}
    this.loading = true;
const payload = {
  CIN: this.cin, 
  bonus: this.model.bonus || 0,
  newPostId: finalPost.id,
  promotionDate: this.promotionDate
    .toISOString()
    .split('T')[0]
};
    this.promotionService.createPromotion(payload).subscribe({

      next: (res: any) => {

  const data = res.data; 

  const promotion: Promotion = {
    id: data.id,
    promotedEmployee: this.model.promotedEmployee, 
    department: this.model.department,
    designationFrom: data.previousPostName,
    designationTo: data.newPostName,
    oldSalary: data.previousSalary,
    bonus: (data.newSalary ?? 0) - (data.previousSalary ?? 0),
    newSalary: data.newSalary,
    promotionDate: data.promotionDate
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

  /* ================= RESET ================= */

  private resetForm() {

    this.cin = '';
    this.promotionDate = new Date();

    this.model = {
      promotedEmployee: '',
      department: '',
      designationFrom: '',
      designationTo: '',
      oldSalary: 0,
      bonus: 0,
      newSalary: 0,
      promotionDate: ''
    };
  }

  onCancel() {
    this.cancel.emit();
  }
}