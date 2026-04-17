export interface AddEducationRequest {
  type: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  fieldOfStudy: string;
  institution: string;
}
