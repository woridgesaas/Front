import { Language } from './candidate.model';

export interface FilterForm {
  jobTitle: string;

  // Compétences
  techSkills: string[];   // ← remplace skills générique
  tools: string[];

  // Expérience
  experience: string;
  experienceMin?: number;

  // Formation
  diploma: string;

  // Langues
  languages: Language[];

  // Localisation
  location: string;

  // Certifications
  certifications: string;

  // Soft Skills
  softSkills: string[];
}

export function createEmptyFilterForm(): FilterForm {
  return {
    jobTitle: '',
    techSkills: [],
    tools: [],
    experience: '',
    diploma: '',
    languages: [],
    location: '',
    certifications: '',
    softSkills: [],
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateFilterForm(form: FilterForm): ValidationResult {
  const errors: string[] = [];
  if (!form.jobTitle?.trim()) {
    errors.push('Le titre du poste est obligatoire');
  }
  return { isValid: errors.length === 0, errors };
}
