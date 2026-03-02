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

  @Output() update = new EventEmitter<Promotion>();
  @Output() cancel = new EventEmitter<void>();

  form: Promotion = {};
  promotionDate: Date = new Date();
  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['promotion'] && this.promotion) {

      this.form = { ...this.promotion };

      this.promotionDate = this.promotion.PromotionDate
        ? new Date(this.promotion.PromotionDate)
        : new Date();

      this.calculateNewSalary();
    }
  }

  calculateNewSalary(): void {
    const oldSalary = Number(this.form.OldSalary || 0);
    const bonus = Number(this.form.Bonus || 0);
    this.form.NewSalary = oldSalary + bonus;
  }

  submit(): void {

    if (!this.form.id) return;

    if ((this.form.Bonus ?? 0) < 0) {
      alert('La prime ne peut pas être négative');
      return;
    }

    this.loading = true;

    const result: Promotion = {
      ...this.form,
      PromotionDate: this.promotionDate.toISOString().split('T')[0]
    };

    this.update.emit(result);
    this.loading = false;
    this.onCancel();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}