import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { 
  PersonalInfoRequestService, 
  PersonalInfoChange,
  PersonalInfoRequest 
} from '../../../services/personal-info-request.service';

// Déclaration TypeScript pour Bootstrap
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
  imports: [CommonModule, FormsModule, BsDatepickerModule]
})
export class EmployeeDetailModalComponent implements OnInit {
  // Données originales (actuelles dans la DB)
  originalEmployee: Employee = {
    id: 1,
    firstName: 'Stephan',
    lastName: 'Peralt',
    endDate: null,
    cin: 'AB123456',
    email: 'perralt12@example.com',
    phone: '(163) 2459 315',
    role: 'Développeur Logiciel',
    image: 'assets/img/users/user-13.jpg'
  };

  // Copie pour modification
  employee: Employee = { ...this.originalEmployee };

  // État de soumission
  isSubmitting = false;
  hasPendingRequest = false;
  showSuccessAlert = false;

  constructor(private requestService: PersonalInfoRequestService) {}

  ngOnInit(): void {
    this.checkPendingRequests();
  }
activeTab: 'info' | 'password' = 'info';

passwordData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};
changePassword(): void {

  if (!this.passwordData.currentPassword ||
      !this.passwordData.newPassword ||
      !this.passwordData.confirmPassword) {
    alert('Tous les champs sont obligatoires');
    return;
  }

  if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }

  // 🔥 appel API ms-auth
  console.log('Changer mot de passe:', this.passwordData);

  // TODO:
  // this.authService.changePassword(this.passwordData).subscribe(...)

  alert('Mot de passe modifié avec succès');

  // reset
  this.passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
}
  /**
   * Vérifier s'il existe déjà une demande en attente
   */
  checkPendingRequests(): void {
    const pending = this.requestService.getPendingRequestsByEmployeeId(
      this.originalEmployee.id
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
      // TODO: Implémenter l'upload d'image
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
      endDate: 'Date de fin'
    };

    // Comparer chaque champ
    (Object.keys(fieldMappings) as Array<keyof Employee>).forEach(field => {
      const oldValue = this.formatValue(this.originalEmployee[field]);
      const newValue = this.formatValue(this.employee[field]);

      if (oldValue !== newValue) {
        changes.push({
          field: field as string,
          label: fieldMappings[field],
          oldValue,
          newValue
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

  if (this.activeTab === 'password') {
    return; // ❌ empêcher submit RH
  }
    // Vérifier s'il y a une demande en attente
    if (this.hasPendingRequest) {
      alert('Vous avez déjà une demande de modification en attente de validation.');
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
    this.requestService.submitRequest(
      this.originalEmployee.id,
      `${this.employee.firstName} ${this.employee.lastName}`,
      this.originalEmployee.role,
      this.originalEmployee.image,
      changes,
      'Employé' // TODO: récupérer l'utilisateur connecté
    ).subscribe({
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
      }
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