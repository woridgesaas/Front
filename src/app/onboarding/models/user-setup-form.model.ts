import { UserRole } from '../enum/user-role.enum';

export interface UserSetupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  picture: File | null;
  role: UserRole;
}
