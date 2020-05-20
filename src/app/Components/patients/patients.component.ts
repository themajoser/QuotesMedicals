import { TokenService } from './../../Services/Token.service';
import { LoginService } from './../../Services/Login.service';
import { HeaderComponent } from './../header/header.component';
import { PatientsService } from './../../Services/patients.service';
import { Patient } from './../../Interfaces/patient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
})
export class PatientsComponent implements OnInit {
  patients: Patient[];

  constructor(private patientsService: PatientsService, private headerComponent: HeaderComponent, private Login: LoginService, private token: TokenService ) { }

  ngOnInit() {
    this.getPatientsByDoctor();
  }
  getPatients(): void {
    this.patientsService.getAllPatients()
        .subscribe(Patients => this.patients = Patients);
  }
  getPatientsByDoctor(): void {
    this.patientsService.getAllPatientsByDoctor(+this.token.getId())
    .subscribe(Patients => this.patients = Patients);

  }

  delete(patient: Patient): void {
    this.patients = this.patients.filter(h => h !== patient);
    this.patientsService.deletePatient(patient).subscribe();
  }














}
