import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Resignation } from '../../../models/models';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';

@Component({
  selector: 'app-edit-resignation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
  templateUrl: './edit-resignation-modal.component.html',
})
export class EditResignationModalComponent {

  @Input() open = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() update = new EventEmitter<Resignation>();

  form: Resignation = {
    reason: '',
    noticeDate: null,
    resignationDate: null,
  };

  @Input() set resignation(value: Resignation | undefined) {
    if (!value) return;
    this.form = {
      ...value,
      noticeDate: value.noticeDate ? new Date(value.noticeDate) : null,
      resignationDate: value.resignationDate ? new Date(value.resignationDate) : null,
    };
  }

  submit() {
    this.update.emit(this.form);
    this.cancel.emit();
  }
}