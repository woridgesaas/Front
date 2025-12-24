import { Injectable } from '@angular/core';
import { DocumentTemplate } from '../models/document-template.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentTemplateService {
  private documentsTemplate: DocumentTemplate[] = [
    //* Work contracts
    {
      code: 'CONTRAT_CDI',
      name: 'Contrat de travail - CDI',
      description:
        "Contrat à durée indéterminée définissant les droits et obligations du salarié et de l'employeur.",
      category: 'Contrats',
      file: null,
    },
    {
      code: 'CONTRAT_CDD',
      name: 'Contrat de travail - CDD',
      description:
        'Contrat à durée déterminée conclu pour une période limitée.',
      category: 'Contrats',
      file: null,
    },
    {
      code: 'AVENANT_CONTRAT',
      name: 'Avenant au contrat de travail',
      description:
        'Document modifiant certaines clauses du contrat initial (poste, salaire, durée ou conditions de travail).',
      category: 'Contrats',
      file: null,
    },
    {
      code: 'CONTRAT_TEMPS_PARTIEL',
      name: 'Contrat de travail à temps partiel',
      description:
        'Contrat précisant une durée de travail inférieure à la durée légale, avec répartition des horaires clairement définie.',
      category: 'Contrats',
      file: null,
    },

    //* Certifications
    {
      code: 'ATTESTATION_TRAVAIL',
      name: 'Attestation de travail',
      description:
        "Document attestant que le salarié est ou a été employé au sein de l'entreprise.",
      category: 'Attestations',
      file: null,
    },
    {
      code: 'ATTESTATION_SALAIRE',
      name: 'Attestation de salaire',
      description: 'Document précisant la rémunération du salarié.',
      category: 'Attestations',
      file: null,
    },
    {
      code: 'CERTIFICAT_TRAVAIL',
      name: 'Certificat de travail',
      description:
        "Document obligatoire remis au salarié à la fin du contrat, mentionnant la période d'emploi et les fonctions exercées.",
      category: 'Attestations',
      file: null,
    },

    //* End of contract
    {
      code: 'LETTRE_LICENCIEMENT',
      name: 'Lettre de licenciement',
      description:
        'Notification écrite informant le salarié de la rupture du contrat.',
      category: 'Fin de contrat',
      file: null,
    },
    {
      code: 'RECU_SOLDE_TOUT_COMPTE',
      name: 'Reçu pour solde de tout compte',
      description:
        "Document récapitulant l'ensemble des sommes versées au salarié à la fin de la relation de travail.",
      category: 'Fin de contrat',
      file: null,
    },
    {
      code: 'DECISION_FIN_CONTRAT',
      name: 'Décision de fin de contrat',
      description:
        "Acte administratif officialisant la fin de la relation contractuelle entre le salarié et l'entreprise.",
      category: 'Fin de contrat',
      file: null,
    },

    //* Discipline
    {
      code: 'AVERTISSEMENT',
      name: 'Avertissement disciplinaire',
      description:
        'Sanction disciplinaire écrite adressée au salarié en cas de manquement aux obligations professionnelles.',
      category: 'Discipline',
      file: null,
    },
    {
      code: 'BLAME',
      name: 'Blâme disciplinaire',
      description:
        'Sanction disciplinaire écrite plus sévère, consignée dans le dossier administratif du salarié.',
      category: 'Discipline',
      file: null,
    },
    {
      code: 'MISE_A_PIED',
      name: 'Décision de mise à pied',
      description:
        'Décision disciplinaire entraînant la suspension temporaire du salarié de ses fonctions.',
      category: 'Discipline',
      file: null,
    },
    {
      code: 'CONVOCATION_ENTRETIEN',
      name: 'Convocation à entretien disciplinaire',
      description:
        'Convocation formelle du salarié à un entretien préalable à toute sanction disciplinaire.',
      category: 'Discipline',
      file: null,
    },

    //* Internships and training
    {
      code: 'ATTESTATION_STAGE',
      name: 'Attestation de stage',
      description:
        'Document remis au stagiaire à la fin de son stage, attestant de la période et des missions réalisées.',
      category: 'Stages & formation',
      file: null,
    },
    {
      code: 'CONVENTION_FORMATION',
      name: 'Convention de formation',
      description:
        "Convention définissant les modalités d'une action de formation interne ou externe.",
      category: 'Stages & formation',
      file: null,
    },

    //* HR internal documents
    {
      code: 'DECISION_PROMOTION',
      name: 'Décision de promotion',
      description:
        "Acte administratif officialisant l'évolution professionnelle du salarié au sein de l'entreprise.",
      category: 'Documents internes RH',
      file: null,
    },
    {
      code: 'DECISION_MUTATION',
      name: 'Décision de mutation',
      description:
        'Décision administrative relative au changement de poste, de service ou de lieu de travail.',
      category: 'Documents internes RH',
      file: null,
    },
    {
      code: 'NOTE_SERVICE',
      name: 'Note de service',
      description:
        'Document interne destiné à communiquer des instructions ou informations officielles.',
      category: 'Documents internes RH',
      file: null,
    },
    {
      code: 'REGLEMENT_INTERIEUR',
      name: 'Règlement intérieur',
      description:
        "Document définissant les règles de discipline, d'hygiène et de sécurité applicables au sein de l'entreprise.",
      category: 'Documents internes RH',
      file: null,
    },
  ];

  getDocumentTemplates(): DocumentTemplate[] {
    return this.documentsTemplate;
  }

  updateTemplateFile(code: string, file: File): void {
    const doc = this.documentsTemplate.find((d) => d.code === code);
    if (doc) {
      doc.file = file;
    }
  }

  saveTemplates(): void {
    console.log('Saved document templates:', this.documentsTemplate);
  }
}
