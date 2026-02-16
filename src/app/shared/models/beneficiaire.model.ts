export interface Beneficiaire {
  id: string;
  nom: string;
  prenom: string;
  avatar: string;
  matricule?: string;
  poste?: string;
  departement?: string;
  type: 'employee' | 'candidate';
}
