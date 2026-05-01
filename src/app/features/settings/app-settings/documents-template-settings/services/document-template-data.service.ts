import { Injectable } from '@angular/core';
import { DocumentTemplate } from '../models/document-template.model';
import { DocumentCategory } from '../enums/document-category.enum';

@Injectable({ providedIn: 'root' })
export class DocumentTemplateDataService {
  private documentsTemplate: DocumentTemplate[] = [
    //* Attestations
    {
      code: 'ATTESTATION_TRAVAIL',
      name: 'Attestation de travail',
      description:
        "Document attestant que le salarié est ou a été employé au sein de l'entreprise.",
      category: DocumentCategory.ATTESTATION,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'ATTESTATION_SALAIRE',
      name: 'Attestation de salaire',
      description: 'Document précisant la rémunération du salarié.',
      category: DocumentCategory.ATTESTATION,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'CERTIFICAT_TRAVAIL',
      name: 'Certificat de travail',
      description:
        "Document obligatoire remis au salarié à la fin du contrat, mentionnant la période d'emploi et les fonctions exercées.",
      category: DocumentCategory.ATTESTATION,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },

    //* Contracts
    {
      code: 'LETTRE_LICENCIEMENT',
      name: 'Lettre de licenciement',
      description:
        'Notification écrite informant le salarié de la rupture du contrat.',
      category: DocumentCategory.CONTRACT,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'RECU_SOLDE_TOUT_COMPTE',
      name: 'Reçu pour solde de tout compte',
      description:
        "Document récapitulant l'ensemble des sommes versées au salarié à la fin de la relation de travail.",
      category: DocumentCategory.CONTRACT,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'DECISION_FIN_CONTRAT',
      name: 'Décision de fin de contrat',
      description:
        "Acte administratif officialisant la fin de la relation contractuelle entre le salarié et l'entreprise.",
      category: DocumentCategory.CONTRACT,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },

    //* Disciplinary
    {
      code: 'AVERTISSEMENT',
      name: 'Avertissement disciplinaire',
      description:
        'Sanction disciplinaire écrite adressée au salarié en cas de manquement aux obligations professionnelles.',
      category: DocumentCategory.DISCIPLINARY,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'BLAME',
      name: 'Blâme disciplinaire',
      description:
        'Sanction disciplinaire écrite plus sévère, consignée dans le dossier administratif du salarié.',
      category: DocumentCategory.DISCIPLINARY,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'MISE_A_PIED',
      name: 'Décision de mise à pied',
      description:
        'Décision disciplinaire entraînant la suspension temporaire du salarié de ses fonctions.',
      category: DocumentCategory.DISCIPLINARY,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'CONVOCATION_ENTRETIEN',
      name: 'Convocation à entretien disciplinaire',
      description:
        'Convocation formelle du salarié à un entretien préalable à toute sanction disciplinaire.',
      category: DocumentCategory.DISCIPLINARY,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },

    //* Internship
    {
      code: 'ATTESTATION_STAGE',
      name: 'Attestation de stage',
      description:
        'Document remis au stagiaire à la fin de son stage, attestant de la période et des missions réalisées.',
      category: DocumentCategory.INTERNSHIP,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'CONVENTION_FORMATION',
      name: 'Convention de formation',
      description:
        "Convention définissant les modalités d'une action de formation interne ou externe.",
      category: DocumentCategory.INTERNSHIP,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },

    //* Policy
    {
      code: 'DECISION_PROMOTION',
      name: 'Décision de promotion',
      description:
        "Acte administratif officialisant l'évolution professionnelle du salarié au sein de l'entreprise.",
      category: DocumentCategory.POLICY,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'DECISION_MUTATION',
      name: 'Décision de mutation',
      description:
        'Décision administrative relative au changement de poste, de service ou de lieu de travail.',
      category: DocumentCategory.POLICY,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
    {
      code: 'REGLEMENT_INTERIEUR',
      name: 'Règlement interne',
      description:
        "Document définissant les règles de discipline, d'hygiène et de sécurité applicables au sein de l'entreprise.",
      category: DocumentCategory.POLICY,
      file: null,
      uploadedId: null,
      previewUrl: null,
    },
  ];

  getAll(): DocumentTemplate[] {
    return this.documentsTemplate;
  }

  getByCategory(category: DocumentCategory): DocumentTemplate[] {
    return this.documentsTemplate.filter((d) => d.category === category);
  }

  setFile(code: string, file: File): void {
    const doc = this.documentsTemplate.find((d) => d.code === code);
    if (doc) doc.file = file;
  }

  setUploaded(code: string, id: string, previewUrl: string): void {
    const doc = this.documentsTemplate.find((d) => d.code === code);
    if (doc) {
      doc.file = null;
      doc.uploadedId = id;
      doc.previewUrl = previewUrl;
    }
  }

  clearUploaded(code: string): void {
    const doc = this.documentsTemplate.find((d) => d.code === code);
    if (doc) {
      doc.file = null;
      doc.uploadedId = null;
      doc.previewUrl = null;
      doc.isDeleting = false;
    }
  }
}
