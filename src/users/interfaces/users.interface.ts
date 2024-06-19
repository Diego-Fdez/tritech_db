import { ROLES } from '../../constants/roles';

export interface UserInterface {
  id: string;
  fullName: string;
  email: string;
  password: string;
  country: string;
  role: ROLES;
  createdAt: Date;
  updatedAt: Date;
}
