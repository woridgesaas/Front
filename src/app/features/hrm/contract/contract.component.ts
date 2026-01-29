import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { MatSelectModule } from '@angular/material/select';
import { EditorComponent ,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
interface Beneficiaire {
  id: string;
  nom: string;
  prenom: string;
  avatar: string;
  matricule?: string;
  poste?: string;
  departement?: string;
  type: 'employee' | 'candidate';
}
interface ContratType {
  id: string;
  nom: string;
  description?: string;
  lastUpdate: Date;
  category: string;
}

interface Variable {
  key: string;
  label: string;
  description: string;
  category: string;
}
@Component({
  selector: 'app-contract',
  standalone:true,
  imports: [BreadcrumbsComponent,FormsModule , CommonModule, MatSelectModule ,EditorComponent],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss',
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' }
  ]
})


export class ContractComponent implements OnInit{

    editorConfig = {
    apiKey: 'o1ivhdhr9742t648u5d5fnzwvy3p0g01wqei573eparkdchn',
    height: 600,
    menubar: false,
    plugins: 'lists link image table code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | removeformat | code',
    content_style: `
      body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; }
      h1, h2, h3 { color: #333; margin-top: 1em; }
      table { border-collapse: collapse; width: 100%; }
      table, th, td { border: 1px solid #ddd; padding: 8px; }
    `
  };
  contratContent = 'Écrivez votre contrat ici...';
  contratTypes: ContratType[] = [
    { id: 'cdi', nom: 'CDI', description: 'Contrat à durée indéterminée', lastUpdate: new Date('2024-01-15'), category: 'standard' },
    { id: 'cdd', nom: 'CDD', description: 'Contrat à durée déterminée', lastUpdate: new Date('2024-01-10'), category: 'standard' },
  ];

  availableVariables: Variable[] = [
    { key: '{{beneficiaire_nom}}', label: 'Nom', description: 'Nom complet du bénéficiaire', category: 'beneficiaire' },
    { key: '{{beneficiaire_prenom}}', label: 'Prénom', description: 'Prénom du bénéficiaire', category: 'beneficiaire' },
    { key: '{{beneficiaire_matricule}}', label: 'Matricule', description: 'Numéro de matricule', category: 'beneficiaire' },
    { key: '{{beneficiaire_poste}}', label: 'Poste', description: 'Poste occupé', category: 'beneficiaire' },
    { key: '{{beneficiaire_departement}}', label: 'Département', description: 'Département/RH', category: 'beneficiaire' },
    { key: '{{contrat_type}}', label: 'Type contrat', description: 'Type de contrat', category: 'contrat' },
    { key: '{{contrat_date_debut}}', label: 'Date début', description: 'Date de début du contrat', category: 'contrat' },
    { key: '{{contrat_date_fin}}', label: 'Date fin', description: 'Date de fin (si applicable)', category: 'contrat' },
    { key: '{{contrat_salaire}}', label: 'Salaire', description: 'Salaire brut mensuel', category: 'contrat' },
    { key: '{{entreprise_nom}}', label: 'Entreprise', description: 'Nom de l\'entreprise', category: 'entreprise' },
    { key: '{{entreprise_adresse}}', label: 'Adresse', description: 'Adresse de l\'entreprise', category: 'entreprise' },
    { key: '{{date_generation}}', label: 'Date génération', description: 'Date de génération du contrat', category: 'systeme' }
  ];
   beneficiaireType: 'employee' | 'candidate' = 'employee';
  searchQuery: string = '';
  searchResults: Beneficiaire[] = [];
  selectedBeneficiaire: Beneficiaire | null = null;
  selectedContratType: string = '';
  isContratGenerated: boolean = false;
  editorMode: 'wysiwyg' | 'source' = 'wysiwyg';
  lastSave: Date = new Date();
  dateNow: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    // Initialisation
  }
  get selectedContratTypeObj(): ContratType | undefined {
    return this.contratTypes.find(type => type.id === this.selectedContratType);
  }

  // Méthodes prototypes
  onSearchBeneficiaire(): void {
    // Prototype - À implémenter avec appel API
    alert('Recherche bénéficiaire:'+ this.searchQuery);

    // Données mockées pour démo
    this.searchResults = [
      { id: '1', nom: 'Dupont', prenom: 'Jean', avatar: 'https://i.pravatar.cc/150?img=3', matricule: 'EMP001', poste: 'Développeur', departement: 'IT', type: 'employee' },
      { id: '2', nom: 'Martin', prenom: 'Marie', avatar: 'https://i.pravatar.cc/150?img=3', matricule: 'EMP002', poste: 'Designer', departement: 'Marketing', type: 'employee' },
      { id: '3', nom: 'Bernard', prenom: 'Paul', avatar: 'https://i.pravatar.cc/150?img=3', poste: 'Commercial', departement: 'Ventes', type: 'employee' }
    ];
  }
  selectBeneficiaire(beneficiaire: Beneficiaire): void {

    alert('Bénéficiaire sélectionné:'+ beneficiaire);
    this.selectedBeneficiaire = beneficiaire;
    this.searchResults = [];
    this.searchQuery = '';
  }
  clearBeneficiaire(): void {
    // Prototype - Effacer la sélection
    this.selectedBeneficiaire = null;
  }

  canGenerateContrat(): boolean {

    return !!this.selectedBeneficiaire && !!this.selectedContratType;
  }

  generateContrat(): void {

    alert('Génération du contrat...');
    alert('Bénéficiaire:'+ this.selectedBeneficiaire);
    alert('Type de contrat:'+ this.selectedContratType);

    this.isContratGenerated = true;

    // Simuler un délai de chargement
    setTimeout(() => {
      alert('Contrat généré avec succès');
      // Ici, on initialiserait CKEditor avec le template
    }, 500);
  }
  insertVariable(variableKey: string): void {

    alert('Insertion variable:'+ variableKey);
  }

  previewContrat(): void {

    alert('Affichage de l\'aperçu');

  }

  printContrat(): void {

    alert('Impression du contrat');

  }

  saveDraft(): void {

    alert('Sauvegarde du brouillon');
    this.lastSave = new Date();

  }

  finalizeContrat(): void {

    alert('Finalisation du contrat');
    alert('Données finales:'+ {
      beneficiaire: this.selectedBeneficiaire,
      typeContrat: this.selectedContratType,
      date: new Date()
    });


  }
  resetForm(): void {

    alert('Réinitialisation du formulaire');

    this.beneficiaireType = 'employee';
    this.searchQuery = '';
    this.searchResults = [];
    this.selectedBeneficiaire = null;
    this.selectedContratType = '';
    this.isContratGenerated = false;
    this.editorMode = 'wysiwyg';
  }
  // Méthode utilitaire pour exemple
  getStatusClass(): string {
    return this.canGenerateContrat() ? 'text-success' : 'text-muted';
  }
}
