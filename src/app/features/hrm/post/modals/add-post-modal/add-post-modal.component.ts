import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../common/form-error-message/form-error-message.component';
import { PostStatus } from '../../enums/post-status.enum';

@Component({
  selector: 'app-add-post-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
  ],
  templateUrl: './add-post-modal.component.html',
})
export class AddPostModalComponent implements OnChanges {
  @Input() open = false;
  @Input() loading = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<{
    name: string;
    baseSalary: number;
    status: 'ACTIVE' | 'INACTIVE';
  }>();

  model = {
    name: '',
    baseSalary: null as number | null,
    status: '' as 'ACTIVE' | 'INACTIVE' | '',
  };

  touched = { name: false, baseSalary: false, status: false };

  submitted = false;

  readonly statusOptions = [
    { value: PostStatus.ACTIVE, label: 'Actif' },
    { value: PostStatus.INACTIVE, label: 'Inactif' },
  ];

  private readonly NAME_PATTERN = /^[a-zA-ZÀ-ÿ\s]+$/;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.resetForm();
    }
  }

  get isNameValid(): boolean {
    const trimmed = this.model.name.trim();
    return (
      trimmed.length > 0 &&
      trimmed.length <= 50 &&
      this.NAME_PATTERN.test(trimmed)
    );
  }

  get isSalaryValid(): boolean {
    const v = this.model.baseSalary;
    if (v === null || v <= 0) return false;
    const [intPart, fracPart = ''] = v.toString().split('.');
    return intPart.replace('-', '').length <= 10 && fracPart.length <= 2;
  }

  get isStatusValid(): boolean {
    return !!this.model.status;
  }

  get formValid(): boolean {
    return this.isNameValid && this.isSalaryValid && this.isStatusValid;
  }

  get nameInvalid(): boolean {
    return (this.touched.name || this.submitted) && !this.isNameValid;
  }

  get salaryInvalid(): boolean {
    return (this.touched.baseSalary || this.submitted) && !this.isSalaryValid;
  }

  get statusInvalid(): boolean {
    return (this.touched.status || this.submitted) && !this.isStatusValid;
  }

  onNameChange(): void {
    this.touched.name = true;
  }
  onSalaryChange(): void {
    this.touched.baseSalary = true;
  }
  onStatusChange(): void {
    this.touched.status = true;
  }

  //* Actions
  onCancel(): void {
    this.resetForm();
    this.cancel.emit();
  }

  submit(): void {
    this.submitted = true;
    if (!this.formValid) return;

    this.add.emit({
      name: this.model.name.trim(),
      baseSalary: this.model.baseSalary!,
      status: this.model.status as 'ACTIVE' | 'INACTIVE',
    });
  }

  private resetForm(): void {
    this.model = { name: '', baseSalary: null, status: '' };
    this.touched = { name: false, baseSalary: false, status: false };
    this.submitted = false;
  }
}
