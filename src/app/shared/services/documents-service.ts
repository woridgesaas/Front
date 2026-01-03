import { Injectable } from '@angular/core';
import { DocumentDemande, RhDocumentDemande } from '../models/models';

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
  private employeesData = [
    {
      id: 101,
      name: 'Jean Dupont',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Développeur Senior',
      department: 'IT',
      email: 'jean.dupont@entreprise.com'
    },
    {
      id: 102,
      name: 'Marie Martin',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Chef de projet',
      department: 'Management',
      email: 'marie.martin@entreprise.com'
    },
    {
      id: 103,
      name: 'Pierre Bernard',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Analyste financier',
      department: 'Finance',
      email: 'pierre.bernard@entreprise.com'
    },
    {
      id: 104,
      name: 'Sophie Petit',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Responsable RH',
      department: 'Ressources Humaines',
      email: 'sophie.petit@entreprise.com'
    }
  ];

  private justifications = [
    'Prêt immobilier chez Société Générale',
    'Justification lorem lepsim',
    'Inscription à une formation externe',
    'Démarches administratives personnelles',
    'Renouvellement de carte de séjour'
  ];


  // NOUVELLE méthode pour RH
  public getAllDocumentsForRH(): any[] {
    return this.mockedData.map((demande, index) => {
      const employee = this.employeesData[index % this.employeesData.length];
      
      return {
        // copy all props of employeDOcs
        ...demande,
        

        employeeId: employee.id,
        employeeName: employee.name,
        employeeAvatar: employee.avatar,
        employeeRole: employee.role,
        employeeDepartment: employee.department,
        employeeEmail: employee.email,
        
        // add new props
        justification: this.justifications[index % this.justifications.length],
        urgency: ['low', 'medium', 'high'][index % 3] as 'low' | 'medium' | 'high',
        documentType: demande.category,
        requiredFormat: 'PDF',
        deliveryMethod: ['email', 'download', 'print'][index % 3] as 'email' | 'download' | 'print',
        
        // Suivi 
        estimatedProcessingDays: [2, 3, 5][index % 3],
        actualProcessingDays: demande.processedDate ? 
          Math.floor((new Date(demande.processedDate).getTime() - new Date(demande.requestDate).getTime()) / (1000 * 3600 * 24)) : 
          undefined,
        
        
        processedBy: demande.processedDate ? 'RH Admin' : undefined,
        processingNotes: demande.notes || undefined
      };
    });
  }

}
