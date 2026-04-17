//* Bank informatrion summary
export interface BankInformationSummary {
  id: string;
  name: string;
  accountHolderName: string;
  RIB: string;
  IBAN: string;
  agencyName: string;
  agencyCity: string;
}

//* Education summary
export interface EducationSummary {
  id: string;
  type: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
  fieldOfStudy: string;
  institution: string;
}

//* Professional experience
export interface ProfessionalExperienceSummary {
  id: string;
  employmentType: string;
  experienceLevel: string;
  companyName: string;
  companyLocation: string;
  jobTitle: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

//* Employee profile
export interface EmployeeProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  CIN: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  picturePath: string | null;
  role: string;
  departmentName: string;
  postName: string;
  createdAt: string;
  birthDate: string | null;
  bankInformationSummary: BankInformationSummary | null;
  educationSummaries: EducationSummary[];
  experienceSummaries: ProfessionalExperienceSummary[];
}
