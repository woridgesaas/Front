export interface ConfigureRecruitmentSiteRequest {
  primaryColor: string;
  secondaryColor: string;
  description: string;
  foundedYear: string;
  email: string;
  phone: string;
  address: string;
  linkedinUrl: string;
}

export interface GetRecruitmentSiteResponse {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  foundedYear: string;
  email: string;
  phone: string;
  address: string;
  linkedinUrl: string;
}
