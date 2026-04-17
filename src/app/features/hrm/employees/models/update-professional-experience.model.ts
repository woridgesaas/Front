export interface UpdateProfessionalExperienceRequest {
  id: string;
  employmentType: string;
  experienceLevel: string;
  companyName: string;
  companyLocation: string;
  jobTitle: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}
