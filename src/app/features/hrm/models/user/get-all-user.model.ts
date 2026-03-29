export interface GetAllUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: 'ACTIVE' | 'INACTIVE';
  picturePath: string | null;
  postName: string;
  createdAt: string;
}
