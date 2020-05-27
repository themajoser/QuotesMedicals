import { TokenService } from './../../Services/Token.service';
import { LoginService } from './../../Services/Login.service';
import { PatientsService } from './../../Services/patients.service';
import { Patient } from './../../Interfaces/patient';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
})
export class PatientsComponent implements OnInit {
  patients: Patient[];
  sortedData: Patient[];
  filterPost = '';

  constructor(private patientsService: PatientsService, private token: TokenService ) { }

  ngOnInit() {
    this.getPatientsByDoctor();
  }

  getPatients(): void {
    this.patientsService.getAllPatients()
        .subscribe(Patients => this.patients = Patients);
  }
  getPatientsByDoctor(): void {
    this.patientsService.getAllPatientsByDoctor(+this.token.getId())
    .subscribe(Patients => {this.patients = Patients;
                            this.sortedData = this.patients.slice();});

  }

  delete(patient: Patient): void {

    this.patients = this.patients.filter(h => h !== patient);
    this.patientsService.deletePatient(patient);

  }
  sortData(sort: Sort) {
    const data = this.patients.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'lastname': return compare(a.lastname, b.lastname, isAsc);
        case 'date_of_birth': return compare(a.date_of_birth.toString(), b.date_of_birth.toString(), isAsc);
        default: return 0;
      }
    });
  }
}
  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
















