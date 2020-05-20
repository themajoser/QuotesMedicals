import { Role } from './../Interfaces/role';
import { Doctor } from './../Interfaces/Doctor';
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
export class DoctorsService {


  constructor(private http: HttpClient, private router: Router) {}

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
  getAllDoctors(): Observable<Doctor[]> {
    const path = `${this.api}/doctors`;
    return this.http.get<Doctor[]>(path);
  }
  getDoctor(id: number): Observable<Doctor>  {
    const path = `${this.api}/doctors/${id}`;
    return this.http.get<Doctor>(path);
  }
  getRoles(): Observable<Role[]> {
    const path = `${this.api}/roles/`;
    return this.http.get<Role[]>(path);
  }
  createDoctor(Doctor: Doctor) {
    const path = `${this.api}/Doctors/create`;

    return this.http.post(path, Doctor, this.httpOptions)  .subscribe((data) => console.log(data),
    err => console.log(err));
  }
  updateDoctor(Doctor: Doctor, id: number) {

    const path = `${this.api}/doctors/${id}`;
    return this.http.put<Doctor>(path, Doctor);
  }
  deleteDoctor(Doctor: Doctor| number) {
    const id = typeof Doctor === 'number' ? Doctor : Doctor.id;

    const path = `${this.api}/Doctors/${id}`;
    return this.http.delete(path);
  }
}
