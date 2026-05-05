import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../common/form-error-message/form-error-message.component';
import { Post } from '../../models/post.models';
import { FormChangeDetector } from '../../../../../shared/utils/form-change-detector.utils';

type EditModel = { id: string; name: string; baseSalary: number | null };

@Component({
  selector: 'app-edit-post-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
  ],
  templateUrl: './edit-post-modal.component.html',
})
export class EditPostModalComponent implements OnChanges {
  @Input() open = false;
  @Input() post!: Post;
  @Input() loading = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() update = new EventEmitter<{
    id: string;
    name: string;
    baseSalary: number;
  }>();
  @Output() noChanges = new EventEmitter<void>();

  model: EditModel = { id: '', name: '', baseSalary: null };
  touched = { name: false, baseSalary: false };
  submitted = false;

  private changeDetector!: FormChangeDetector<EditModel>;
  private readonly NAME_PATTERN = /^[a-zA-ZÀ-ÿ\s]+$/;

  constructor(private toastr: ToastrService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.model = {
        id: this.post.id,
        name: this.post.name,
        baseSalary: this.post.baseSalary,
      };
      this.changeDetector = new FormChangeDetector<EditModel>(this.model);
      this.touched = { name: false, baseSalary: false };
      this.submitted = false;
    }
  }

  //* Validation

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

  get formValid(): boolean {
    return this.isNameValid && this.isSalaryValid;
  }

  get nameInvalid(): boolean {
    return (this.touched.name || this.submitted) && !this.isNameValid;
  }

  get salaryInvalid(): boolean {
    return (this.touched.baseSalary || this.submitted) && !this.isSalaryValid;
  }

  onNameChange(): void {
    this.touched.name = true;
  }
  onSalaryChange(): void {
    this.touched.baseSalary = true;
  }

  //* Actions
  onCancel(): void {
    this.submitted = false;
    this.cancel.emit();
  }

  submit(): void {
    this.submitted = true;

    if (!this.formValid) return;

    if (!this.changeDetector.hasChanges(this.model)) {
      this.toastr.warning('Aucune modification détectée');
      this.noChanges.emit();
      return;
    }

    this.update.emit({
      id: this.model.id,
      name: this.model.name.trim(),
      baseSalary: this.model.baseSalary!,
    });
  }
}
