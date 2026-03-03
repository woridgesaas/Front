export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
  CIN: string;
  departmentId: string;
  postId: string;
  picturePath?: string | null;
}
