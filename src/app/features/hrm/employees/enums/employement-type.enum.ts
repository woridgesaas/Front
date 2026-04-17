export enum EmploymentType {
  PERMANENT_CONTRACT = 'PERMANENT_CONTRACT',
  TEMPORARY_CONTRACT = 'TEMPORARY_CONTRACT',
  INTERNSHIP         = 'INTERNSHIP',
  FREELANCE          = 'FREELANCE',
  VOLUNTEER          = 'VOLUNTEER',
}

export const EMPLOYMENT_TYPE: Record<EmploymentType, string> = {
  [EmploymentType.PERMANENT_CONTRACT]: 'CDI',
  [EmploymentType.TEMPORARY_CONTRACT]: 'CDD',
  [EmploymentType.INTERNSHIP]:         'Stage',
  [EmploymentType.FREELANCE]:          'Freelance',
  [EmploymentType.VOLUNTEER]:          'Bénévolat',
};
