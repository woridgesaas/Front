import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { Promotion } from '../../../../../../shared/models/models';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { Post } from '../../../../models/post/post.model';
import { UserApiService } from '../../../../services/user/user-api.service';

@Component({
  selector: 'app-edit-promotion-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
  templateUrl: './edit-promotion.component.html',
})
export class EditPromotionModalComponent implements OnChanges {

  @Input() open = false;
  @Input() promotion?: Promotion;
posts: Post[] = [];
isPostOpen = false;
  @Output() update = new EventEmitter<Promotion>();
  @Output() cancel = new EventEmitter<void>();
constructor(private userApi: UserApiService) {}
  form: Promotion = {};
  promotionDate: Date = new Date();
  loading = false;

 ngOnChanges(changes: SimpleChanges): void {
  if (changes['promotion'] && this.promotion) {

    this.form = { ...this.promotion };

this.form.oldSalary = this.promotion.oldSalary ?? 0;
    this.form.newSalary = this.promotion.newSalary ?? 0;

this.form.bonus =
  (this.form.newSalary || 0) - (this.form.oldSalary || 0);

    this.promotionDate = this.promotion.promotionDate
      ? new Date(this.promotion.promotionDate)
      : new Date();

    const post = this.posts.find(p => p.name === this.form.designationTo);
    this.form.newPostId = post?.id;

  }
}
onBonusChange(): void {
  const oldSalary = Number(this.form.oldSalary || 0);
  const bonus = Number(this.form.bonus || 0);

  this.form.newSalary = oldSalary + bonus;
}
setPostId() {
  const post = this.posts.find(p => p.name === this.form.designationTo);
  this.form.newPostId = post?.id;
}

calculateNewSalary(): void {
  const oldSalary = Number(this.form.oldSalary || 0);
  const bonus = Number(this.form.bonus || 0);
  this.form.newSalary = oldSalary + bonus;
}
ngOnInit() {
  this.loadPosts();
}
loadPosts() {
  this.userApi.getPosts().subscribe({
    next: (res: any) => {
      this.posts = res.data || [];
    },
  });
}
selectPosition(post: Post) {
  this.form.designationTo = post.name;
  this.form.newPostId = post.id; 
  this.isPostOpen = false;
}
submit(): void {

  if (!this.form.id || !this.form.newPostId) {
    alert('Veuillez sélectionner un poste');
    return;
  }

  if ((this.form.bonus ?? 0) < 0) {
    alert('La prime ne peut pas être négative');
    return;
  }

  this.loading = true;

  const result: Promotion = {
    ...this.form,
    promotionDate: this.promotionDate.toISOString().split('T')[0]
  };

  this.update.emit(result);
  this.loading = false;
  this.onCancel();
}
  onCancel(): void {
    this.cancel.emit();
  }
}