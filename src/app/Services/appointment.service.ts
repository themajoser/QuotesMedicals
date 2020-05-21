import { Role } from './../Interfaces/role';
import { Appointment } from './../Interfaces/appointment';
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
export class AppointmentsService {

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
  getAppointmentsByDoctor(id: number): Observable<Appointment[]>  {
    const path = `${this.api}/appointments/doctor/${id}`;

    return this.http.get<Appointment[]>(path ) ;
  }
  getAllAppointments(): Observable<Appointment[]> {
    const path = `${this.api}/appointments`;
    return this.http.get<Appointment[]>(path);

  }
  getAppointment(id: number): Observable<Appointment>  {
    const path = `${this.api}/appointments/${id}`;
    return this.http.get<Appointment>(path ) ;
  }
  getRoles(): Observable<Role[]> {
    const path = `${this.api}/roles/`;
    return this.http.get<Role[]>(path);
  }
  createAppointment(appointment: Appointment) {
    const path = `${this.api}/appointments/create`;

    return this.http.post(path, appointment, this.httpOptions)  .subscribe((data) => console.log(data),
    err => console.log(err));
  }
  updateAppointment(appointment: Appointment, id: number) {

    const path = `${this.api}/appointments/${id}`;
    console.log(appointment);
    return this.http.put(path, appointment, this.httpOptions) .subscribe((data) => console.log(data),
    err => console.log(err));
  }
  deleteAppointment(appointment: Appointment| number) {
    const id = typeof appointment === 'number' ? appointment : appointment.id;
    const path = `${this.api}/appointments/${id}`;
    return this.http.delete(path);
  }
}
