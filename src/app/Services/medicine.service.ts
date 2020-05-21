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

@Injectable({
  providedIn: 'root',
})
export class MedicineService {

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

    return this.http.post(path, patient, this.httpOptions)  .subscribe((data) => console.log(data),
    err => console.log(err));
  }
  updateMedicine(patient: Medicine, id: number) {

    const path = `${this.api}/medicines/${id}`;
    return this.http.put(path, patient, this.httpOptions) .subscribe((data) => console.log(data),
    err => console.log(err));
  }
  deleteMedicine(patient: Medicine| number) {
    const id = typeof patient === 'number' ? patient : patient.id;
    const path = `${this.api}/medicines/${id}`;
    return this.http.delete(path);
  }
}
