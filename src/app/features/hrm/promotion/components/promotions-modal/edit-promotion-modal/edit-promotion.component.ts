import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
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
  @Input() promotion!: Promotion;
promotionDate!: Date;

  @Output() update = new EventEmitter<Promotion>();
  @Output() cancel = new EventEmitter<void>();

  form!: Promotion;

  ngOnChanges(): void {
  if (this.promotion) {
    this.form = { ...this.promotion };

    // convertir string -> Date pour le datepicker
    this.promotionDate = this.promotion.PromotionDate
      ? new Date(this.promotion.PromotionDate)
      : new Date();
  }
}


  calculateNewSalary() {
    this.form.NewSalary =
      (this.form.OldSalary || 0) + (this.form.Bonus || 0);
  }

  onCancel() {
    this.cancel.emit();
  }

  submit() {
  const result: Promotion = {
    ...this.form,
    PromotionDate: this.promotionDate.toLocaleDateString(),
  };

  this.update.emit(result);
  this.onCancel();
}

}
