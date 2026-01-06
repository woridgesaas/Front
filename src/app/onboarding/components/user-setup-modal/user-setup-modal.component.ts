import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../features/common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../features/common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../features/common/form-error-message/form-error-message.component';
import { UserRole } from '../../enum/user-role.enum';
import { UserSetupForm } from '../../models/user-setup-form.model';

@Component({
  selector: 'app-user-setup-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
  ],
  templateUrl: './user-setup-modal.component.html',
})
export class UserSetupModalComponent implements OnInit {
  @Input({ required: true }) role!: UserRole;
  @Output() saved = new EventEmitter<UserSetupForm>();
  @Output() close = new EventEmitter<void>();
  @Input() title!: string;
  @Input() icon!: string;

  touched = false;
  preview: string | null = null;

  form: UserSetupForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    picture: null,
    role: UserRole.CEO, //* default (overridden on init)
  };

  ngOnInit(): void {
    this.form.role = this.role;
  }

  //* Validation
  get isInvalid(): boolean {
    return (
      !this.form.firstName ||
      !this.form.lastName ||
      !this.form.email ||
      !this.form.phone
    );
  }

  //* Get error message
  getErrorMessage(): string {
    if (!this.form.firstName) return 'Le prénom est obligatoire';
    if (!this.form.lastName) return 'Le nom est obligatoire';
    if (!this.form.email) return "L'email est obligatoire";
    if (!this.form.phone) return 'Le téléphone est obligatoire';
    return '';
  }

  //* File handling
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 4 * 1024 * 1024; //* 4 MB

    if (!allowedTypes.includes(file.type)) {
      alert('Seuls les fichiers JPG et PNG sont autorisés.');
      return;
    }

    if (file.size > maxSize) {
      alert("La taille de l'image doit être inférieure à 4 MB.");
      return;
    }

    this.form.picture = file;

    const reader = new FileReader();
    reader.onload = () => (this.preview = reader.result as string);
    reader.readAsDataURL(file);
  }

  //* Submit
  submit(): void {
    this.touched = true;

    if (this.isInvalid) return;

    this.saved.emit(this.form);
    this.hideModal();
  }

  //* Modal control
  onClose(): void {
    this.close.emit();
    this.hideModal();
  }

  private hideModal(): void {
    const modalEl = document.getElementById('ceoModal');
    if (!modalEl) return;

    let modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
      modal = new (window as any).bootstrap.Modal(modalEl);
    }

    modal.hide();
  }
}
