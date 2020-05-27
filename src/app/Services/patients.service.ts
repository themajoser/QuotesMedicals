import { Role } from './../Interfaces/role';
import { Patient } from './../Interfaces/patient';
import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subscription, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class PatientsService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'accept-language': 'en-US,en;q=0.8'


                             })
  };

  private api = 'http://localhost:8080';

  private isNotAutorizate(e): boolean{
    if (e.status === 401 || e.status === 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
}

  /** GET heroes from the server */
  getAllPatients(): Observable<Patient[]> {
    const path = `${this.api}/patients`;
    return this.http.get<Patient[]>(path);

  }
  getAllPatientsByDoctor(id: number): Observable<Patient[]> {
    const path = `${this.api}/patients/getPatientByDoctor/${id}`;
    return this.http.get<Patient[]>(path);

  }
  getPatient(id: number): Observable<Patient>  {
    const path = `${this.api}/patients/${id}`;
    return this.http.get<Patient>(path ) ;
  }
  getRoles(): Observable<Role[]> {
    const path = `${this.api}/roles/`;
    return this.http.get<Role[]>(path);
  }
  createPatient(patient: Patient) {
    const path = `${this.api}/patients/create`;

    return this.http.post(path, patient, this.httpOptions)  .subscribe((data) => this.showToasterAdd(),
    err => this.showToaster());
  }
  updatePatient(patient: Patient, id: number) {

    const path = `${this.api}/patients/${id}`;
    return this.http.put(path, patient, this.httpOptions) .subscribe((data) => this.showToasterUpdate(),
    err =>  this.showToaster());
  }
  deletePatient(patient: Patient| number) {
    const id = typeof patient === 'number' ? patient : patient.id;
    const path = `${this.api}/patients/${id}`;
    return this.http.delete(path) .subscribe(next => this.showToasterDelete(),
    err =>  this.showToaster());
  }


  showToaster() {
    this.toastr.error('No se ha podido realizar la acción, por favor intentelo más tarde  ');
  }
  showToasterUpdate(){
    this.toastr.success('Has editado el paciente  exitosamente.');
  }
  showToasterAdd(){
    this.toastr.success('Has añadido el paciente  exitosamente.');
  }
  showToasterDelete(){
    this.toastr.success('Has eliminado el paciente  exitosamente.');
  }
}
