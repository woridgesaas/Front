
import { Language } from './candidate.model';

export interface FilterForm {
  // Compétences techniques
  skills: string[];
  
  // Outils et technologies
  tools: string[];
  
  // Expérience professionnelle
  experience: string;
  experienceMin?: number; // Années minimales
  experienceMax?: number; // Années maximales
  
  // Formation
  diploma: string;
  
  // Langues requises
  languages: Language[];
  
  // Localisation
  location: string;
  remoteAccepted?: boolean; // Accepte le télétravail
  
  // Certifications
  certifications: string;
  
  // Soft skills
  softSkills: string[];
  
  // Critères additionnels
  minAiScore?: number; // Score IA minimum
  availability?: AvailabilityType;
  salaryRange?: SalaryRange;
  
  // Métadonnées
  searchName?: string; // Nom de la recherche sauvegardée
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Type de disponibilité
 */
export type AvailabilityType = 'Immédiate' | '1 mois' | '2 mois' | '3+ mois';

/**
 * Plage salariale
 */
export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

/**
 * Poids des critères pour le scoring IA
 */
export interface FilterWeights {
  skills: number;
  tools: number;
  experience: number;
  diploma: number;
  languages: number;
  certifications: number;
  softSkills: number;
  location: number;
}

/**
 * Résultat du filtrage
 */
export interface FilterResult {
  candidates: any[]; // Remplacer par le type Candidate si importé
  totalCount: number;
  filteredCount: number;
  averageScore: number;
  executionTime: number; // Temps d'exécution en ms
  criteria: FilterForm;
}

/**
 * Historique des filtres
 */
export interface FilterHistory {
  id: string;
  form: FilterForm;
  resultCount: number;
  executedAt: Date;
  executedBy: string;
}

/**
 * Helper pour créer un formulaire vide
 */
export function createEmptyFilterForm(): FilterForm {
  return {
    skills: [],
    tools: [],
    experience: '',
    diploma: '',
    languages: [],
    location: '',
    certifications: '',
    softSkills: [],
    remoteAccepted: false,
    minAiScore: 0
  };
}

/**
 * Helper pour valider le formulaire
 */
export function validateFilterForm(form: FilterForm): ValidationResult {
  const errors: string[] = [];
  
  // Au moins un critère doit être rempli
  const hasAnyCriteria = 
    form.skills.length > 0 ||
    form.tools.length > 0 ||
    form.experience !== '' ||
    form.diploma !== '' ||
    form.languages.length > 0 ||
    form.location !== '' ||
    form.certifications !== '' ||
    form.softSkills.length > 0;
  
  if (!hasAnyCriteria) {
    errors.push('Veuillez sélectionner au moins un critère de filtrage');
  }
  
  // Validation du score minimum
  if (form.minAiScore !== undefined && (form.minAiScore < 0 || form.minAiScore > 100)) {
    errors.push('Le score minimum doit être entre 0 et 100');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Interface de résultat de validation
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Helper pour comparer deux formulaires
 */
export function areFormsEqual(form1: FilterForm, form2: FilterForm): boolean {
  return JSON.stringify(form1) === JSON.stringify(form2);
}

/**
 * Helper pour sauvegarder le formulaire
 */
export function saveFilterForm(form: FilterForm, name: string): void {
  const savedForm = {
    ...form,
    searchName: name,
    createdAt: new Date()
  };
  
  const savedFilters = getSavedFilters();
  savedFilters.push(savedForm);
  
  localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
}

/**
 * Helper pour récupérer les formulaires sauvegardés
 */
export function getSavedFilters(): FilterForm[] {
  const saved = localStorage.getItem('savedFilters');
  return saved ? JSON.parse(saved) : [];
}

/**
 * Helper pour supprimer un formulaire sauvegardé
 */
export function deleteSavedFilter(searchName: string): void {
  const savedFilters = getSavedFilters();
  const updated = savedFilters.filter(f => f.searchName !== searchName);
  localStorage.setItem('savedFilters', JSON.stringify(updated));
}

/**
 * Helper pour obtenir les poids par défaut
 */
export function getDefaultWeights(): FilterWeights {
  return {
    skills: 0.30,      // 30%
    tools: 0.15,       // 15%
    experience: 0.20,  // 20%
    diploma: 0.10,     // 10%
    languages: 0.10,   // 10%
    certifications: 0.05, // 5%
    softSkills: 0.05,  // 5%
    location: 0.05     // 5%
  };
}

/**
 * Helper pour calculer le score IA d'un candidat
 */
export function calculateAiScore(candidate: any, form: FilterForm, weights: FilterWeights = getDefaultWeights()): number {
  let totalScore = 0;
  
  // Score des compétences
  if (form.skills.length > 0) {
    const skillMatch = form.skills.filter(s => candidate.skills?.includes(s)).length / form.skills.length;
    totalScore += skillMatch * weights.skills * 100;
  }
  
  // Score des outils
  if (form.tools.length > 0) {
    const toolMatch = form.tools.filter(t => candidate.tools?.includes(t)).length / form.tools.length;
    totalScore += toolMatch * weights.tools * 100;
  }
  
  // Score de l'expérience
  if (form.experience) {
    const expMatch = candidate.experienceYears >= parseInt(form.experience) ? 1 : 0.5;
    totalScore += expMatch * weights.experience * 100;
  }
  
  // Score du diplôme
  if (form.diploma && candidate.diploma === form.diploma) {
    totalScore += weights.diploma * 100;
  }
  
  // Score des langues
  if (form.languages.length > 0) {
    const langMatch = form.languages.filter(l => 
      candidate.languages?.some((cl: Language) => cl.name === l.name)
    ).length / form.languages.length;
    totalScore += langMatch * weights.languages * 100;
  }
  
  // Score de la localisation
  if (form.location && candidate.location === form.location) {
    totalScore += weights.location * 100;
  }
  
  // Score des soft skills
  if (form.softSkills.length > 0) {
    const softMatch = form.softSkills.filter(s => candidate.softSkills?.includes(s)).length / form.softSkills.length;
    totalScore += softMatch * weights.softSkills * 100;
  }
  
  return Math.round(Math.min(totalScore, 100));
}