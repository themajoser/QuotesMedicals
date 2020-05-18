export interface Patient {
  SSCode:number;
  id:number;
  login:string;
  password:string;
  name:string;
  lastname:string;
  date_of_birth:string;
  allergies:string;
  cancer:string;
  id_doctor:number;
  diseases:string;
  deleted:number;
  created_at:string;
  deleted_at:string;
  doctor:any;
}
