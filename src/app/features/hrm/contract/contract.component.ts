import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContractGeneratorService } from '../../../shared/services/contract-generator.service';
import { Beneficiaire } from '../../../shared/models/beneficiaire.model';
import { ContratType } from '../../../shared/models/contrat-type.model';
import { BreadcrumbsComponent } from "../../common/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-contract',
  standalone: true,              
  imports: [CommonModule, FormsModule, BreadcrumbsComponent],
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent {
// ===== ACTIONS =====

printContrat(): void {
  window.print();
}
mockGenerate(): void {
  this.selectedBeneficiaire = {
    id: '1',
    nom: 'amin',
    prenom: 'chakhar',
    avatar: '',
    poste: 'Développeur',
    departement: 'IT',
    type: 'employee',
  };

  // ❌ NE PAS écraser selectedContratType
  // this.selectedContratType = 'cdi';

  this.generateContrat();
}

resetForm(): void {
  // Réinitialiser l'état
  this.isContratGenerated = false;

  // Réinitialiser la configuration
  this.selectedBeneficiaire = null;
  this.selectedContratType = '';
  this.contractContent = '';

  // (optionnel) reset date
  this.dateNow = new Date();
}


finalizeContrat(): void {
  console.log('Contrat finalisé');
  console.log(this.contractContent);

  // Plus tard :
  // - sauvegarde en base
  // - export PDF
  // - signature RH
}

  // ===== ÉTAT =====
  selectedBeneficiaire: Beneficiaire | null = null;
  selectedContratType: 'cdi' | 'cdd' | '' = '';
  isContratGenerated = false;

  contractContent = '';
  dateNow = new Date();

  // ===== DONNÉES =====
  contratTypes: ContratType[] = [
    {
      id: 'cdi',
      nom: 'CDI',
      description: 'Contrat à durée indéterminée',
      lastUpdate: new Date(),
      category: 'standard',
    },
    {
      id: 'cdd',
      nom: 'CDD',
      description: 'Contrat à durée déterminée',
      lastUpdate: new Date(),
      category: 'standard',
    },
  ];

  constructor(private contractGenerator: ContractGeneratorService) {}

  generateContrat(): void {
    if (!this.selectedBeneficiaire || !this.selectedContratType) return;

    const contratType: 'CDI' | 'CDD' =
      this.selectedContratType === 'cdi' ? 'CDI' : 'CDD';

    const context = {
      entrepriseNom: 'Woridge',
      entrepriseAdresse: 'Bd ANFA – Oujda',

      beneficiaireNom: this.selectedBeneficiaire.nom,
      beneficiairePrenom: this.selectedBeneficiaire.prenom,
      beneficiaireCin: '111111',
      beneficiaireNationalite: 'Marocaine',
      beneficiaireAdresse: 'Oujda',
      beneficiairePoste: this.selectedBeneficiaire.poste ?? '',
      beneficiaireDepartement: this.selectedBeneficiaire.departement ?? '',

      contratType,
      dateDebut: '01/02/2026',
      dateFin: contratType === 'CDD' ? '01/02/2027' : '',
      salaire: '8000',
      lieuTravail: 'Oujda',

      dateGeneration: new Date().toLocaleDateString(),
    };

    this.contractContent = this.contractGenerator.generate(
      contratType,
      context
    );

    this.isContratGenerated = true;
  }
}
