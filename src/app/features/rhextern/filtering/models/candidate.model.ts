
export interface Candidate {
  id: number;
  candidateId: string;
  name: string;
  email: string;
  phone: string;
  location: string;

  // Scoring IA
  aiScore: number;

  // ✅ NOUVEAU — retournés par .NET après matching
  isCompatible?: boolean;    // catégorie prédite == titre offre
  category?: string;         // catégorie prédite par /predict
  explanation?: string;      // explication du score

  status: CandidateStatus;
  experienceYears: number;
  skills: string[];
  tools?: string[];
  diploma?: string;
  certifications?: string[];
  languages?: Language[];
  softSkills?: string[];
  cvUrl: string;
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
