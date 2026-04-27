// ── Modèle principal — reflète exactement la réponse .NET ────────────────
export interface FilteringResultResponse {
  id: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  location: string;
  scoreIa: number;
  experienceYears: number;
  technicalSkills: string[];   // tech + outils séparés
  softSkills: string[];        // soft séparé
  missingSkills: string[];     // skills manquantes
  recommendation: string;      // Strongly recommended | Recommended | Weakly recommended | Not recommended
  mainDomain: string;
  seniorityLevel: string;      // Student | Junior | Mid | Senior | Expert
  cvStatus: string;            // pending | accepted | rejected
  cvDownloadUrl: string;
  analysisDate: string;
}

// Alias — utilisé dans tous les composants
export type Candidate = FilteringResultResponse;

// Valeurs possibles de cvStatus (backend EN)
export type CandidateStatus = 'pending' | 'accepted' | 'rejected';

// ── Modèle Langue ────────────────────────────────────────────────────────
export interface Language {
  name: string;
  level: LanguageLevel;
}

export type LanguageLevel =
  | 'Débutant'
  | 'Intermédiaire'
  | 'Avancé'
  | 'Courant'
  | 'Bilingue';
