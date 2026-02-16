export interface ContractContext {
  entrepriseNom: string;
  entrepriseAdresse: string;

  beneficiaireNom: string;
  beneficiairePrenom: string;
  beneficiaireCin: string;
  beneficiaireNationalite: string;
  beneficiaireAdresse: string;
  beneficiairePoste: string;
  beneficiaireDepartement: string;

  contratType: 'CDI' | 'CDD';
  dateDebut: string;
  dateFin?: string;
  salaire: string;
  lieuTravail: string;

  dateGeneration: string;
}
