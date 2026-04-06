import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChangePasswordService } from '../../../../../../shared/services/changePassword';
import {
  PersonalInfoRequestService,
  PersonalInfoChange,
  PersonalInfoRequest,
} from '../../../services/personal-info-request.service';
import { ToastrService } from 'ngx-toastr';

declare const bootstrap: any;

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  endDate: Date | null;
  cin: string;
  email: string;
  phone: string;
  role: string;
  image?: string;
}

@Component({
  selector: 'app-employee-detail-modal',
  standalone: true,
  templateUrl: './employee-detail-modal.component.html',
  styleUrl: './employee-detail-modal.component.scss',
  imports: [CommonModule, FormsModule, BsDatepickerModule],
})
export class EmployeeDetailModalComponent implements OnInit {
  originalEmployee: Employee = {
    id: 1,
    firstName: 'Stephan',
    lastName: 'Peralt',
    endDate: null,
    cin: 'AB123456',
    email: 'perralt12@example.com',
    phone: '(163) 2459 315',
    role: 'Développeur Logiciel',
    image: 'assets/img/users/user-13.jpg',
  };
  showCurrent = false;
  showNew = false;
  showConfirm = false;
passwordStrength: 'faible' | 'moyenne' | 'forte' | '' = '';

  employee: Employee = { ...this.originalEmployee }; // Copie pour modification
  // État de soumission
  isSubmitting = false;
  hasPendingRequest = false;
  showSuccessAlert = false;
  passwordChangeMessage: string = '';
  passwordChangeType: 'success' | 'error' | '' = '';
  activeTab: 'info' | 'password' = 'info';
  otpMessage: string = '';
  otpMessageType: 'success' | 'error' | '' = '';
  isSendingOtp = false;
  isVerifyingOtp = false;
  isChangingPassword = false;
  otpVerified = false;
  otpSent = false;
  passwordError: string = '';
  passwordData = {
    currentPassword: '',
    otpCode: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private requestService: PersonalInfoRequestService,
    private changePasswordService: ChangePasswordService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.checkPendingRequests();
  }
checkPasswordStrength(password: string) {
  if (!password) {
    this.passwordStrength = '';
    return;
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) this.passwordStrength = 'faible';
  else if (score === 2 || score === 3) this.passwordStrength = 'moyenne';
  else this.passwordStrength = 'forte';
}
  sendOtp(): void {
  this.passwordError = '';
  this.otpMessage = '';

  if (!this.passwordData.currentPassword?.trim()) {
    this.passwordError = 'Veuillez entrer votre mot de passe actuel';
    return;
  }

  this.isSendingOtp = true;

  this.changePasswordService
    .requestOtp({ currentPassword: this.passwordData.currentPassword })
    .subscribe({
      next: () => {
        this.otpSent = true;
        this.otpVerified = false;

        this.otpMessage = 'Code OTP envoyé avec succès';
        this.otpMessageType = 'success';
      },

      error: (error) => {
        this.otpMessageType = 'error';

        if (error.status === 400) {
          this.passwordError = 'Mot de passe incorrect';
        } else if (error.status === 401) {
          this.otpMessage = 'Session expirée';
        } else {
          this.otpMessage = 'Erreur lors de l’envoi OTP';
        }

        this.isSendingOtp = false;
      },

      complete: () => {
        this.isSendingOtp = false;
      }
    });
}

  verifyOtp(): void {
  if (!this.passwordData.otpCode?.trim()) {
    this.otpMessage = 'Veuillez entrer le code OTP';
    this.otpMessageType = 'error';
    return;
  }

  this.isVerifyingOtp = true;

  this.changePasswordService
    .verifyOtp({ otpCode: this.passwordData.otpCode })
    .subscribe({
      next: () => {
        this.otpVerified = true;
        this.otpMessage = 'Code OTP validé';
        this.otpMessageType = 'success';
      },

      error: (error) => {
        this.otpVerified = false;
        this.otpMessageType = 'error';

        if (error.status === 400) {
          this.otpMessage = 'OTP incorrect ou expiré';
        } else {
          this.otpMessage = 'Erreur validation OTP';
        }

        this.isVerifyingOtp = false;
      },

      complete: () => {
        this.isVerifyingOtp = false;
      }
    });
}

  changePassword(): void {
  this.passwordChangeMessage = '';

  if (!this.otpVerified) {
    this.passwordChangeMessage = 'Veuillez valider OTP';
    this.passwordChangeType = 'error';
    return;
  }

  if (!this.passwordData.newPassword || !this.passwordData.confirmPassword) {
    this.passwordChangeMessage = 'Champs requis';
    this.passwordChangeType = 'error';
    return;
  }

  if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
    this.passwordChangeMessage = 'Les mots de passe ne correspondent pas';
    this.passwordChangeType = 'error';
    return;
  }

  this.isChangingPassword = true;

  this.changePasswordService
    .confirmPassword({
      newPassword: this.passwordData.newPassword,
      confirmPassword: this.passwordData.confirmPassword
    })
    .subscribe({
      next: () => {
        this.passwordChangeMessage = 'Mot de passe modifié';
        this.passwordChangeType = 'success';
        this.resetPasswordForm();
         //  logout direct
  localStorage.removeItem('token');

  setTimeout(() => {
    this.closeModal();
    window.location.href = '/login'; // ou router.navigate
  }, 1500);
      },

      error: () => {
        this.passwordChangeMessage = 'Erreur changement mot de passe';
        this.passwordChangeType = 'error';
        this.isChangingPassword = false;
      },

      complete: () => {
        this.isChangingPassword = false;
      }
    });
}

  private resetPasswordForm(): void {
    this.passwordData = {
      currentPassword: '',
      otpCode: '',
      newPassword: '',
      confirmPassword: '',
    };

    this.otpSent = false;
    this.otpVerified = false;
  }
  /**
   * Vérifier s'il existe déjà une demande en attente
   */
  checkPendingRequests(): void {
    const pending = this.requestService.getPendingRequestsByEmployeeId(
      this.originalEmployee.id,
    );
    this.hasPendingRequest = pending.length > 0;
  }
  /**
   * Gestion de la sélection d'image
   */
  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      console.log('Image sélectionnée:', file);
    }
  }
  /**
   * Détecter les changements entre original et modifié
   */

  private detectChanges(): PersonalInfoChange[] {
    const changes: PersonalInfoChange[] = [];

    const fieldMappings: { [key: string]: string } = {
      firstName: 'Prénom',
      lastName: 'Nom',
      cin: 'CIN',
      email: 'Email',
      phone: 'Téléphone',
      endDate: 'Date de fin',
    };

    // Comparer chaque champ
    (Object.keys(fieldMappings) as Array<keyof Employee>).forEach((field) => {
      const oldValue = this.formatValue(this.originalEmployee[field]);
      const newValue = this.formatValue(this.employee[field]);

      if (oldValue !== newValue) {
        changes.push({
          field: field as string,
          label: fieldMappings[field],
          oldValue,
          newValue,
        });
      }
    });

    return changes;
  }

  /**
   * Formater une valeur pour l'affichage
   */
  private formatValue(value: any): string {
    if (value === null || value === undefined) return '';
    if (value instanceof Date) {
      return value.toLocaleDateString('fr-FR');
    }
    return String(value);
  }

  /**
   * Soumission du formulaire
   */

  onSubmit(): void {
    // Vérifier s'il y a une demande en attente
    if (this.hasPendingRequest) {
      alert(
        'Vous avez déjà une demande de modification en attente de validation.',
      );
      return;
    }

    // Détecter les changements
    const changes = this.detectChanges();

    if (changes.length === 0) {
      alert('Aucune modification détectée.');
      return;
    }

    // Confirmer la soumission
    const confirmMsg = `Vous allez soumettre ${changes.length} modification(s) à la validation RH. Continuer ?`;
    if (!confirm(confirmMsg)) {
      return;
    }

    this.isSubmitting = true;

    // Soumettre la demande
    this.requestService
      .submitRequest(
        this.originalEmployee.id,
        `${this.employee.firstName} ${this.employee.lastName}`,
        this.originalEmployee.role,
        this.originalEmployee.image,
        changes,
        'Employé', // TODO: récupérer l'utilisateur connecté
      )
      .subscribe({
        next: (request: PersonalInfoRequest) => {
          console.log('Demande soumise:', request);

          // Afficher message de succès
          this.showSuccessAlert = true;
          this.hasPendingRequest = true;

          // Fermer le modal après 2 secondes
          setTimeout(() => {
            this.closeModal();
            this.showSuccessAlert = false;
          }, 2000);
        },
        error: (error: any) => {
          console.error('Erreur lors de la soumission:', error);
          alert('Erreur lors de la soumission de la demande.');
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
  }

  /**
   * Annuler les modifications
   */
  onCancel(): void {
    // Réinitialiser avec les données originales
    this.employee = { ...this.originalEmployee };
  }

  /**
   * Fermer le modal
   */
  closeModal(): void {
    const modalElement = document.getElementById('edit_employee_detail');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }

    // Réinitialiser le formulaire
    this.onCancel();
  }
}
