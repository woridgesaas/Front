import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { resignation } from '../../../../../../shared/models/models';
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
  @Input() departments: { Department: string }[] = [];

  @Output() cancel = new EventEmitter<void>();
  @Output() update = new EventEmitter<resignation>();

  isDeptOpen = false;
  form!: resignation;

  /** INPUT resignation (setter UNIQUE) */
  @Input() set resignation(value: resignation | undefined) {
    if (!value) return;

    this.form = {
      ...value,
      NoticeDate: value.NoticeDate ? new Date(value.NoticeDate) : null,
      ResignationDate: value.ResignationDate
        ? new Date(value.ResignationDate)
        : null,
    };
  }

  selectDepartment(dept: string) {
    this.form.Department = dept;
    this.isDeptOpen = false;
  }

  submit() {
    this.update.emit(this.form);
    this.cancel.emit();
  }
}
