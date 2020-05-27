import { Role } from './../Interfaces/role';
import { Medicine } from './../Interfaces/medicine';
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
export class MedicineService {

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
  getAllMedicines(): Observable<Medicine[]> {
    const path = `${this.api}/medicines`;
    return this.http.get<Medicine[]>(path);

  }

  getMedicine(id: number): Observable<Medicine>  {
    const path = `${this.api}/medicines/${id}`;
    return this.http.get<Medicine>(path ) ;
  }

  createMedicine(patient: Medicine) {
    const path = `${this.api}/medicines/create`;

    return this.http.post(path, patient, this.httpOptions)  .subscribe((data) => this.showToasterAdd(),
    err =>  this.showToaster());
  }
  updateMedicine(patient: Medicine, id: number) {

    const path = `${this.api}/medicines/${id}`;
    return this.http.put(path, patient, this.httpOptions) .subscribe((data) => this.showToasterUpdate() ,
    err =>  this.showToaster());
  }
  deleteMedicine(patient: Medicine| number) {
    const id = typeof patient === 'number' ? patient : patient.id;
    const path = `${this.api}/medicines/${id}`;
    return this.http.delete(path).subscribe((data) => this.showToasterDelete() ,
    err =>  this.showToaster());
  }
  showToaster() {
    this.toastr.error('No se ha podido realizar la acción, por favor intentelo más tarde  ');
  }
  showToasterUpdate(){
    this.toastr.success('Has editado el  medicamento  exitosamente.');
  }
  showToasterAdd(){
    this.toastr.success('Has añadido el  medicamento  exitosamente.');
  }
  showToasterDelete(){
    this.toastr.success('Has eliminado el  medicamento  exitosamente.');
  }
}
