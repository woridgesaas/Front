import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ✅ SOLUTION 2: Déclarer bootstrap globalement
declare var bootstrap: any;

export interface EmergencyContact {
  name: string;
  relation: string;
  phone1: string;
  phone2: string;
}

@Component({
  selector: 'app-edit-emergency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-emergency.component.html',
  styleUrl: './edit-emergency.component.scss'
})
export class EditEmergencyComponent {
  @Input() set contactData(data: EmergencyContact | null) {
    if (data) {
      this.contact = { ...data };
    }
  }

  @Output() onSave = new EventEmitter<EmergencyContact>();

  // Contact principal
  contact: EmergencyContact = {
    name: '',
    relation: '',
    phone1: '',
    phone2: ''
  };

  // Liste des relations possibles
  relations = [
    'Époux(se)',
    'Père',
    'Mère',
    'Frère',
    'Sœur',
    'Fils',
    'Fille',
    'Ami(e)',
    'Autre'
  ];

  // Méthode onSubmit
  onSubmit() {
    // Validation
    if (!this.contact.name || !this.contact.phone1) {
      alert('Le nom et le téléphone 1 sont obligatoires');
      return;
    }

    // Émettre les données
    this.onSave.emit(this.contact);
    
    // Fermer le modal - Maintenant bootstrap est reconnu
    this.closeModal();
  }

  // Fermer le modal avec bootstrap déclaré
  closeModal() {
    const modalElement = document.getElementById('edit_emergency');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.contact = {
      name: '',
      relation: '',
      phone1: '',
      phone2: ''
    };
  }
}