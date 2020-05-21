import { Medicine } from './medicine';
import { Doctor } from './doctor';
import { Patient } from './patient';

export interface Appointment {
  id: number;
  assement: string;
  status: string;
  date: Date;
  doctor: Doctor;
  patient: Patient;
  medicines: Medicine;
}
