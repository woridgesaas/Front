import { Injectable } from '@angular/core';
import { DocumentDemande, RhDocumentDemande } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private mockedData : DocumentDemande[]=[
      {
        id: '1',
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
        id: '3',
        documentCode: 'ATTESTATION_SALAIRE',
        documentName: 'Attestation de salaire',
        description: 'Document précisant votre rémunération',
        category: 'Attestations',
        requestDate: new Date('2024-01-10'),
        processedDate: new Date('2024-01-12'),
        status: 'pending',
      },
      {
        id: '5',
        documentCode: 'CERTIFICAT_TRAVAIL',
        documentName: 'Certificat de travail',
        description: 'Document obligatoire remis à la fin du contrat',
        category: 'Attestations',
        requestDate: new Date('2024-01-05'),
        processedDate: new Date('2024-01-07'),
        status: 'ready',
      },
      {
        id: '6',
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
  public getAllStatistics():any{
    const pendingCount = this.mockedData.filter((doc:any)=>doc.status === 'pending').length;
    const acceptedCount = this.mockedData.filter((doc:any)=>doc.status === 'ready').length;
    const rejectedCount = this.mockedData.filter((doc:any)=>doc.status === 'rejected').length;
    return [
        {
        title: 'Total Demandes',
        value: this.mockedData.length,
        icon: 'ti ti-list-details',
        color: 'primary',
        description: 'Toutes les demandes',
        change: 12,
        trend: 'up'
      },
      {
        title: 'En attente',
        value: pendingCount,
        icon: 'ti ti-hourglass',
        color: 'warning',
        description: 'Demandes non traitées',
        change: -5,
        trend: 'down'
      },
      {
        title: 'Acceptées',
        value: acceptedCount,
        icon: 'ti ti-check',
        color: 'success',
        description: 'Demandes validées',
        change: 8,
        trend: 'up'
      },
      {
        title: 'Refusées',
        value: rejectedCount,
        icon: 'ti ti-x',
        color: 'danger',
        description: 'Demandes rejetées',
        change: 3,
        trend: 'stable'
      },
    ]
  }
}
