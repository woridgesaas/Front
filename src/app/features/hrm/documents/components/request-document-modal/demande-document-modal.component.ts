import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentTemplate } from '../../../../../shared/models/document-template.model';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DocumentCategory } from '../../../../../shared/enum/document-category.enum';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';

@Component({
  selector: 'app-demande-document-modal',
  imports: [MatSelectModule , CommonModule ,FormsModule,ModalHeaderComponent],
  templateUrl: './demande-document-modal.component.html',
  styleUrl: './demande-document-modal.component.scss',
})
export class DemandeDocumentModalComponent implements OnInit{
  // Input: Liste des documents disponibles depuis le parent
  @Input() documentTemplates: DocumentTemplate[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() demandCreated = new EventEmitter<{
    documentCode: string;
    notes?: string;
    urgent: boolean;
  }>();
  //Variables de formauliare binder :)
  selectedDocumentCode: string = '';
  demandNotes: string = '';
  isUrgent: boolean = false;
  submitting: boolean = false;

  // Filtre pour les documents
  searchTerm: string = '';

  ngOnInit(): void {

  }
   get selectedDocument(): DocumentTemplate | undefined {
    return this.documentTemplates.find(doc => doc.code === this.selectedDocumentCode);
  }

  // Getter pour les categorie uniques
  get documentCategories(): DocumentCategory[] {
    const categories = new Set(this.documentTemplates.map(doc => doc.category));
    return Array.from(categories) as DocumentCategory[];
  }

  // Getter pour les documents
  get filteredDocuments(): DocumentTemplate[] {
    if (!this.searchTerm) {
      return this.documentTemplates;
    }

    const term = this.searchTerm.toLowerCase();
    return this.documentTemplates.filter(doc =>
      doc.name.toLowerCase().includes(term) ||
      doc.description.toLowerCase().includes(term) ||
      doc.category.toLowerCase().includes(term)
    );
  }

  // methods pour obtenir les documents par catégorie
  getDocumentsByCategory(category: DocumentCategory): DocumentTemplate[] {
    return this.documentTemplates.filter(doc => doc.category === category);
  }
  // Soumission du formulaire
  submitDemand(form: NgForm): void {
    if (form.invalid || !this.selectedDocumentCode) {
      return;
    }

    this.submitting = true;

    // Simuler
    setTimeout(() => {
      const newDemand = {
        documentCode: this.selectedDocumentCode,
        notes: this.demandNotes.trim() || undefined,
        urgent: this.isUrgent
      };

      // sift l parent heeho demande created :)
      this.demandCreated.emit(newDemand);

      // reset de form
      this.resetForm(form);
      this.submitting = false;

    }, 1500);
  }
   resetForm(form: any): void {
    this.selectedDocumentCode = '';
    this.demandNotes = '';
    this.isUrgent = false;
    this.searchTerm = '';

    if (form) {
      form.resetForm();
    }
  }
}
