import { Patient } from './../Interfaces/patient';
import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subscription, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {


  constructor(private http: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'accept-language': 'en-US,en;q=0.8',
                              'Access-Control-Allow-Origin' : 'http://localhost:8080'
                             })
  };

  private api = 'http://localhost:8080';

  private isNotAutorizate(e): boolean{
    if (e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
}

  /** GET heroes from the server */
  getAllPatients(): Observable<Patient[]> {
    const path = `${this.api}/patients`;
    return this.http.get(path).pipe(
      map(response => {
        const patients = response as Patient[];
        return patients.map(patient => {
          patient.date_of_birth = formatDate(patient.date_of_birth, 'dd-MM-yyyy', 'en-US' );
          return patient;
        });
      }),
      catchError(e => {
        this.isNotAutorizate(e);
        return throwError(e);
      })

    );
  }
  getPatient(id: number): Observable<Patient>  {
    const path = `${this.api}/patients/${id}`;
    return this.http.get<Patient>(path);
  }
  createPatient(patient: Patient) {
    const path = `${this.api}/patients/create`;

    return this.http.post(path, patient, this.httpOptions);
  }
  updatePatient(patient: Patient, id: number) {
    console.log( id);
    const path = `${this.api}/patients/${id}`;
    return this.http.put<Patient>(path, patient);
  }
  deletePatient(patient: Patient| number) {
    const id = typeof patient === 'number' ? patient : patient.id;
    console.log(id);
    const path = `${this.api}/patients/${id}`;
    return this.http.delete(path);
  }
}
