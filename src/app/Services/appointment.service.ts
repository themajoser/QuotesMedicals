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
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {

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
  getAppointmentsByPatient(id: number): Observable<Appointment[]>  {
    const path = `${this.api}/appointments/patient/${id}`;

    return this.http.get<Appointment[]>(path ) ;
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

    return this.http.post(path, appointment, this.httpOptions)  .subscribe((data) =>  this.showToasterAdd(),
    err => this.showToaster());
  }
  updateAppointment(appointment: Appointment, id: number) {

    const path = `${this.api}/appointments/${id}`;

    return this.http.put(path, appointment, this.httpOptions)  .subscribe((data) =>  this.showToasterUpdate(),
    err => this.showToaster());
  }
  deleteAppointment(appointment: Appointment| number) {
    const id = typeof appointment === 'number' ? appointment : appointment.id;
    const path = `${this.api}/appointments/${id}`;
    return this.http.delete(path) .subscribe((data) =>  this.showToasterDelete(),
    err => this.showToaster());
  }
  showToaster() {
    this.toastr.error('No se ha podido realizar la acción, por favor intentelo más tarde  ');
  }
  showToasterUpdate(){
    this.toastr.success('Has actualizado la cita  exitosamente.');
  }
  showToasterAdd(){
    this.toastr.success('Has añadido la cita  exitosamente.');
  }
  showToasterDelete(){
    this.toastr.success('Has eliminado la cita  exitosamente.');
  }
}
