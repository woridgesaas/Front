export interface UpdatePersonalInformationRequest {
  firstName: string;
  lastName: string;
  cin: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string | null;
  profileImageUrl: string | null;
}
