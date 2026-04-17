export enum ExperienceLevel {
  INTERN = 'INTERN',
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  LEAD = 'LEAD',
  MANAGER = 'MANAGER',
  DIRECTOR = 'DIRECTOR',
  EXECUTIVE = 'EXECUTIVE',
}

export const EXPERIENCE_LEVEL: Record<ExperienceLevel, string> = {
  [ExperienceLevel.INTERN]: 'Stagiaire',
  [ExperienceLevel.JUNIOR]: 'Junior',
  [ExperienceLevel.SENIOR]: 'Senior',
  [ExperienceLevel.LEAD]: 'Expert technique',
  [ExperienceLevel.MANAGER]: 'Manager',
  [ExperienceLevel.DIRECTOR]: 'Directeur',
  [ExperienceLevel.EXECUTIVE]: 'Cadre dirigeant',
};
