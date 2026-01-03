import { Injectable } from '@angular/core';
import { DocumentDemande } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private mockedData : DocumentDemande[]=[
      {
        id: 1,
        documentCode: 'ATTESTATION_TRAVAIL',
        documentName: 'Attestation de travail',
        description:
          "Document attestant que vous êtes employé dans l'entreprise",
        category: 'Attestations',
        requestDate: new Date('2024-01-15'),
        processedDate: new Date('2024-01-16'),
        status: 'ready',
      },
      {
        id: 3,
        documentCode: 'ATTESTATION_SALAIRE',
        documentName: 'Attestation de salaire',
        description: 'Document précisant votre rémunération',
        category: 'Attestations',
        requestDate: new Date('2024-01-10'),
        processedDate: new Date('2024-01-12'),
        status: 'pending',
      },
      {
        id: 5,
        documentCode: 'CERTIFICAT_TRAVAIL',
        documentName: 'Certificat de travail',
        description: 'Document obligatoire remis à la fin du contrat',
        category: 'Attestations',
        requestDate: new Date('2024-01-05'),
        processedDate: new Date('2024-01-07'),
        status: 'ready',
      },
      {
        id: 6,
        documentCode: 'DECISION_PROMOTION',
        documentName: 'Décision de promotion',
        description: 'Acte officialisant votre évolution professionnelle',
        category: 'Documents internes RH',
        requestDate: new Date('2024-01-22'),
        processedDate: undefined,
        status: 'rejected',
        notes: 'Demande incomplète',
      },
    ];
  public getDocumentsByEmploye():DocumentDemande[]{
    return this.mockedData;
  }
}
