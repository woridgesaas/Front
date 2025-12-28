
export interface Candidate {
  // Identifiants
  id: number;
  candidateId: string;

  // Informations personnelles
  name: string;
  email: string;
  phone: string;
  location: string;

  // Scoring IA
  aiScore: number;

  // Statut de candidature
  status: CandidateStatus;

  // Expérience professionnelle
  experienceYears: number;

  // Compétences et outils
  skills: string[];
  tools?: string[];

  // Formation
  diploma?: string;
  certifications?: string[];

  // Langues
  languages?: Language[];

  // Soft skills
  softSkills?: string[];

  // Documents
  cvUrl: string;

  // Sélection dans l'interface (REQUIS)
  isSelected?: boolean;
}

/**
 * Statuts possibles d'un candidat (3 statuts de base)
 */
export type CandidateStatus = 'En attente' | 'Accepté' | 'Refusé';

/**
 * Langue parlée
 */
export interface Language {
  name: string;
  level: LanguageLevel;
}

/**
 * Niveaux de langue
 */
export type LanguageLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Courant' | 'Bilingue';