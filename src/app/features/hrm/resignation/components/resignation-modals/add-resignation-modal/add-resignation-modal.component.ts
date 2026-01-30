import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { resignation } from '../../../../../../shared/models/models';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';

@Component({
  selector: 'app-add-resignation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
  templateUrl: './add-resignation-modal.component.html',
})
export class AddResignationModalComponent {
  @Output() departmentChange = new EventEmitter<string>();

  @Input() open = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<resignation>();
  @Input() departments: { Department: string }[] = [];
isDeptOpen = false;

 form: resignation = {
  resignation: null, //  juste pour satisfaire TS
  isSelected: false,
  Image: 'user-01.jpg',
  ResigningEmployee: '',
  Department: '',
  Reason: '',
  NoticeDate: null,
  ResignationDate: null,
};
selectDepartment(dept: string) {
  this.form.Department = dept;
  this.isDeptOpen = false;
}

  submit() {
    this.add.emit({ ...this.form });
    this.cancel.emit();
  }
}
