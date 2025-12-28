
export interface Interviewer {
    id: string;
    nom: string;
    email: string;
    photo: string;
    specialite: string;
    disponibilites?: string[];
    isActive?: boolean;
  }
  
  /**
   * Créer un interviewer vide
   */
  export function createEmptyInterviewer(): Interviewer {
    return {
      id: '',
      nom: '',
      email: '',
      photo: 'default-avatar.jpg',
      specialite: '',
      disponibilites: [],
      isActive: true
    };
  }