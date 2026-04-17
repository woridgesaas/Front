export interface UpdateEducationRequest {
  id: string;
  type: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  fieldOfStudy: string;
  institution: string;
}
