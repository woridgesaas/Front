import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { MatSelectModule } from '@angular/material/select';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { VariablesModalComponent } from './modals/variables-modal/variables-modal.component';

import {
  ContractEditorService,
  CandidateModel,
} from '../../../shared/services/contract-editor-service';
import { ToastService } from '../../../shared/services/toast.service';

interface Beneficiaire {
  id: number;
  nom: string;
  prenom: string;
  avatar: string;
  matricule?: string;
  poste?: string;
  departement?: string;
  email: string;       // candidateEmail mappé depuis le backend
  location: string;
  type: 'candidate';
}

interface ContratType {
  id: string;
  nom: string;
  description?: string;
}

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    FormsModule,
    CommonModule,
    MatSelectModule,
    EditorComponent,
    VariablesModalComponent,
  ],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss',
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' },
  ],
})
export class ContractComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  editorConfig = {
    apiKey: (import.meta as any).env?.NG_APP_TINYMCE_API_KEY,
    height: 600,
    menubar: false,
    plugins: 'lists link image table code help wordcount',
    toolbar:
      'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | removeformat | code',
    content_style: `
      body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; }
      h1, h2, h3 { color: #333; margin-top: 1em; }
      table { border-collapse: collapse; width: 100%; }
      table, th, td { border: 1px solid #ddd; padding: 8px; }
    `,
    setup: (editor: any) => {
      this.setupRightClickMenu(editor);
    },
  };

  contratContent = 'Écrivez votre contrat ici...';

  contratTypes: ContratType[] = [
    { id: 'cdi', nom: 'CDI', description: 'Contrat à durée indéterminée' },
    { id: 'cdd', nom: 'CDD', description: 'Contrat à durée déterminée' },
  ];

  predefinedVariables: any[] = [];

  searchQuery = '';
  searchResults: Beneficiaire[] = [];
  selectedBeneficiaire: Beneficiaire | null = null;
  selectedContratType = '';
  isContratGenerated = false;
  isGenerating = false;

  // Cache des candidats embauchés chargés au démarrage
  private hiredCandidates: CandidateModel[] = [];

  dateNow: Date = new Date();

  constructor(
    private service: ContractEditorService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.service.getContractExemple().subscribe({
      next: (content) => (this.contratContent = content),
      error: (err) => console.error(err),
    });

    this.predefinedVariables = this.service.getVariableCategories();
    this.loadHiredCandidates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get selectedContratTypeObj(): ContratType | undefined {
    return this.contratTypes.find((t) => t.id === this.selectedContratType);
  }

  // ── FIX PRINCIPAL : statut exact = "Embauché" (comme dans le backend C#) ──
  private loadHiredCandidates(): void {
    this.service
      .getAllCandidates()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (candidates) => {
          console.log('[DEBUG] Tous les candidats:', candidates);

          this.hiredCandidates = candidates.filter(
            (c) => c.status === 'Embauché'
          );

          console.log('[DEBUG] Candidats embauchés:', this.hiredCandidates);
        },
        error: (err) => {
          console.error('Erreur chargement candidats:', err);
          this.toast.error('Impossible de charger la liste des candidats.');
        },
      });
  }

  // ── Recherche locale sur le cache hiredCandidates ─────────────────────────
  onSearchBeneficiaire(): void {
    const q = this.searchQuery.trim().toLowerCase();

    if (!q) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.hiredCandidates
      .filter(
        (c) =>
          c.applicationName?.toLowerCase().includes(q) ||
          c.detectedCategory?.toLowerCase().includes(q) ||
          c.location?.toLowerCase().includes(q)
      )
      .map((c) => this.mapCandidateToForm(c));
  }

  // ── Sélection → GET détail → remplissage variables TinyMCE ───────────────
  selectBeneficiaire(result: Beneficiaire): void {
    this.selectedBeneficiaire = result;
    this.searchResults = [];
    this.searchQuery = '';

    this.service
      .getCandidateById(result.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (candidate) => {
          this.contratContent = this.fillVariables(this.contratContent, candidate);
        },
        error: (err) => {
          console.error('Erreur détail candidat:', err);
          this.toast.error('Impossible de récupérer les données du candidat.');
        },
      });
  }

  clearBeneficiaire(): void {
    this.selectedBeneficiaire = null;
  }

  canGenerateContrat(): boolean {
    return !!this.selectedBeneficiaire && !!this.selectedContratType && !this.isGenerating;
  }

  generateContrat(): void {
    if (!this.selectedBeneficiaire || !this.selectedContratType) return;

    const cleanHtml = this.service.cleanContent(this.contratContent);
    this.isGenerating = true;

    this.service
      .generateContract(this.selectedBeneficiaire.id, {
        contractHtml: cleanHtml,
        candidateEmail: this.selectedBeneficiaire.email,
        candidateName: `${this.selectedBeneficiaire.nom} ${this.selectedBeneficiaire.prenom}`.trim(),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isContratGenerated = true;
          this.isGenerating = false;
          this.toast.success(
            `Contrat généré ! Email envoyé à ${this.selectedBeneficiaire?.email}.`
          );
          console.log('Contrat généré :', response);
        },
        error: (err) => {
          this.isGenerating = false;
          console.error('Erreur génération contrat:', err);
          this.toast.error('Erreur lors de la génération du contrat.');
        },
      });
  }

  previewContrat(): void {}

  resetForm(): void {
    this.service.getContractExemple().subscribe({
      next: (content) => (this.contratContent = content),
      error: () => (this.contratContent = 'Écrivez votre contrat ici...'),
    });
    this.searchQuery = '';
    this.searchResults = [];
    this.selectedBeneficiaire = null;
    this.selectedContratType = '';
    this.isContratGenerated = false;
    this.isGenerating = false;
  }

  // ── Helpers privés ────────────────────────────────────────────────────────

  private mapCandidateToForm(c: CandidateModel): Beneficiaire {
    const parts = (c.applicationName ?? '').trim().split(' ');
    return {
      id: c.id,
      nom: parts[0] ?? '',
      prenom: parts.slice(1).join(' '),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.applicationName)}&background=6c757d&color=fff`,
      poste: c.detectedCategory,
      departement: c.location,
      email: c.candidateEmail,      // champ exact du backend
      location: c.location ?? '',
      type: 'candidate',
    };
  }

  private fillVariables(content: string, candidate: CandidateModel): string {
    const today = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const map: Record<string, string> = {
      '{NOM_COMPLET}':           candidate.applicationName ?? '',
      '{ADRESSE_EMPLOYE}':       candidate.location ?? '',
      '{POSTE}':                 candidate.detectedCategory ?? '',
      '{LIEU_TRAVAIL}':          candidate.location ?? '',
      '{DATE_EMBAUCHE}':         today,
      '{DATE_COURANTE}':         today,
      '{HEURES_SEMAINE}':        '44',
      '{JOURS_TRAVAIL_SEMAINE}': '6',
      '{CONGES_PAYES_ACQUIS}':   '18',
      '{PERIODE_ESSAI}':         '3 mois',
    };

    // Variables non mappées ({CIN}, {SALAIRE}…) → restent intactes pour saisie HR
    return content.replace(/\{[A-ZÀ-Ü_]+\}/g, (match) => map[match] ?? match);
  }

  // ── TinyMCE right-click menu (inchangé) ──────────────────────────────────

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

    this.predefinedVariables.forEach((category: any) => {
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

      category.variables.forEach((variable: any) => {
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
        item.addEventListener('mouseenter', () => (item.style.background = '#f8f9fa'));
        item.addEventListener('mouseleave', () => (item.style.background = 'white'));
        menu.appendChild(item);
      });
    });

    document.body.appendChild(menu);

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
