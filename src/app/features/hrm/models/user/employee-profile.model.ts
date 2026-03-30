export interface BankInformationDTO {
  bankName: string;
  accountNumber: string;
  iban: string;
  agency: string;
}

export interface EducationDTO {
  university: string;
  fieldOfStudy: string;
  degree: string;
  startFinalYear: string;
}

export interface ProfessionalExperienceDTO {
  companyName: string;
  jobTitle: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  logoPath: string | null;
}

export interface EmployeeProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  picturePath: string | null;
  role: string;
  departmentName: string;
  postName: string;
  createdAt: string;
  birthDate: string | null;
  bankInformation: BankInformationDTO | null;
  educations: EducationDTO[];
  experiences: ProfessionalExperienceDTO[];
}
