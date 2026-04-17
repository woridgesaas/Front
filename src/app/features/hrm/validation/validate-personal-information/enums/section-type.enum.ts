export enum SectionType {
  PERSONAL_INFORMATION = 'PERSONAL_INFORMATION',
  BANK_INFORMATION = 'BANK_INFORMATION',
  EDUCATION = 'EDUCATION',
  PROFESSIONAL_EXPERIENCE = 'PROFESSIONAL_EXPERIENCE',
}

export const SECTION_TYPE: Record<SectionType, string> = {
  [SectionType.PERSONAL_INFORMATION]: 'Informations personnelles',
  [SectionType.BANK_INFORMATION]: 'Informations bancaires',
  [SectionType.EDUCATION]: 'Éducation et formation',
  [SectionType.PROFESSIONAL_EXPERIENCE]: 'Expérience professionnelle',
};
