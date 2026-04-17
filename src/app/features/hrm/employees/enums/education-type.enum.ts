export enum EducationType {
  EDUCATION = 'EDUCATION',
  FORMATION = 'FORMATION',
}

export const EDUCATION_TYPE: Record<EducationType, string> = {
  [EducationType.EDUCATION]: 'Diplôme',
  [EducationType.FORMATION]: 'Formation',
};
