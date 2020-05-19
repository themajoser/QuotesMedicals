import { Role } from './role';
import { Doctor } from './doctor';
export interface Patient {
  SSCode: number;
  id: number;
  login: string;
  password: string;
  name: string;
  lastname: string;
  date_of_birth: Date;
  allergies: string;
  cancer: string;
  diseases: string;
  deleted: number;
  created_at: string;
  deleted_at: string;
  doctor: Doctor;
  role: Role;
}
