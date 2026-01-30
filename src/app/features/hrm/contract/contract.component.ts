import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { MatSelectModule } from '@angular/material/select';
import { EditorComponent ,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ContractEditorService } from '../../../shared/services/contract-editor-service';
import { VariablesModalComponent } from './modals/variables-modal/variables-modal.component';
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
}

@Component({
  selector: 'app-contract',
  standalone:true,
  imports: [BreadcrumbsComponent,FormsModule , CommonModule, MatSelectModule ,EditorComponent,VariablesModalComponent],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss',
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' }
  ]
})

export class ContractComponent implements OnInit{

  editorConfig = {
    apiKey: import.meta.env.NG_APP_TINYMCE_API_KEY,
    height: 600,
    menubar: false,
    plugins: 'lists link image table code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | removeformat | code',
    content_style: `
      body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; }
      h1, h2, h3 { color: #333; margin-top: 1em; }
      table { border-collapse: collapse; width: 100%; }
      table, th, td { border: 1px solid #ddd; padding: 8px; }
    `,
    setup: (editor: any) => {
      this.setupRightClickMenu(editor);
    }
  };
  contratContent = 'Écrivez votre contrat ici...';
  contratTypes: ContratType[] = [
    { id: 'cdi', nom: 'CDI', description: 'Contrat à durée indéterminée'},
    { id: 'cdd', nom: 'CDD', description: 'Contrat à durée déterminée' },
  ];
  predefinedVariables:any[]=[];

  beneficiaireType: 'employee' | 'candidate' = 'employee';
  searchQuery: string = '';
  searchResults: Beneficiaire[] = [];
  selectedBeneficiaire: Beneficiaire | null = null;
  selectedContratType: string = '';
  isContratGenerated: boolean = false;
  
  
  dateNow: Date = new Date();

  constructor(private service:ContractEditorService) {}

  ngOnInit(): void {
    this.service.getContractExemple().subscribe(
      {next:(content)=>{
        this.contratContent=content
      },
    error:(err)=>console.error(err)}
    )
    this.predefinedVariables = this.service.getVariableCategories();
  }
  get selectedContratTypeObj(): ContratType | undefined {
    return this.contratTypes.find(type => type.id === this.selectedContratType);
  }

  
  onSearchBeneficiaire(): void {
  
    alert('Recherche bénéficiaire:'+ this.searchQuery);

    // Mocked for demo
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
    
    this.selectedBeneficiaire = null;
  }

  canGenerateContrat(): boolean {

    return !!this.selectedBeneficiaire && !!this.selectedContratType;
  }

  generateContrat(): void {
    if (!this.selectedBeneficiaire || !this.selectedContratType) return;

    console.log(this.contratContent);
    console.log(this.service.cleanContent(this.contratContent));
    //Call api to save
    this.isContratGenerated = true;

  }

  previewContrat():void{

  }
  resetForm(): void {

    alert('Réinitialisation du formulaire');
    this.contratContent='Écrivez votre contrat ici...';
    this.beneficiaireType = 'employee';
    this.searchQuery = '';
    this.searchResults = [];
    this.selectedBeneficiaire = null;
    this.selectedContratType = '';
    this.isContratGenerated = false;
  }

  /**-------------------------- Editor methods----------------------- */
  private setupRightClickMenu(editor: any) {
    editor.on('contextmenu', (e: any) => {
      
      e.preventDefault();
      
      this.createVariableMenu(e, editor);
    });
  }
  private createVariableMenu(event: MouseEvent, editor: any) {
     const oldMenu = document.querySelector('.variable-menu');
    if (oldMenu) oldMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'variable-menu';
    menu.style.cssText = `
      position: fixed;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10000;
      max-height: 400px;
      overflow-y: auto;
      width: 250px;
      left: ${event.clientX}px;
      top: ${event.clientY}px;
    `;

    // Titre
    const title = document.createElement('div');
    title.textContent = 'Variables disponibles';
    title.style.cssText = `
      padding: 10px 12px;
      background: #f8f9fa;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
      color: #333;
    `;
    menu.appendChild(title);

    // Add each categorie
    this.predefinedVariables.forEach((category:any) => {
      // Header
      const catHeader = document.createElement('div');
      catHeader.textContent = category.label;
      catHeader.style.cssText = `
        padding: 6px 12px;
        background: #e9ecef;
        font-weight: 600;
        color: #495057;
        border-bottom: 1px solid #dee2e6;
      `;
      menu.appendChild(catHeader);

     
      category.variables.forEach((variable:any) => {        
        const item = document.createElement('div');
        item.textContent = variable.code;
        item.style.cssText = `
          padding: 6px 12px 6px 20px;
          cursor: pointer;
          font-size: 13px;
          border-bottom: 1px solid #f8f9fa;
        `;

        item.addEventListener('click', () => {
          editor.insertContent(`<span class="variable">${variable.code}</span> `);
          menu.remove();
        });

        item.addEventListener('mouseenter', () => {
          item.style.background = '#f8f9fa';
        });
        item.addEventListener('mouseleave', () => {
          item.style.background = 'white';
        });

        menu.appendChild(item);
      });
    });

    document.body.appendChild(menu);

    // Handlle click outside
    setTimeout(() => {
      const closeHandler = (e: MouseEvent) => {
        if (!menu.contains(e.target as Node)) {
          menu.remove();
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 0);
  }
}

