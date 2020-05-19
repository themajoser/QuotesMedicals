import { Role } from './role';
export interface Doctor {
  id:number;
  login:string;
  password:string;
  name:string;
  lastname:string;
  date_of_birth:Date;
  speciality:string;
  deleted:number;
  created_at:string;
  deleted_at:string;
  role: Role;
}
