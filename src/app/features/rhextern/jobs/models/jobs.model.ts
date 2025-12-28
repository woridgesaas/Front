/**
 * Interface pour une offre d'emploi
 */
export interface JobsInfo {
    Job_ID: string;
    Job_Title: string;
    Category: string;
    Location: string;
    Salary_Range: string;
    Posted_Date: string;
    Roll: string;
    Image: string;
    Experience: string;
    isSelected: boolean;
    sNo?: number;
  }
  
  /**
   * Interface pour une plateforme de publication
   */
  export interface Plateforme {
    id: string;
    nom: string;
    icone: string;
    description: string;
    selectionnee: boolean;
  }
  
  /**
   * Résultat d'une validation
   */
  export interface ValidationResult {
    isValid: boolean;
    errors: string[];
  }