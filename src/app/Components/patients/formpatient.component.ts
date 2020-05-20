import { TokenService } from './../../Services/Token.service';
import { Patient } from './../../Interfaces/patient';
import { Doctor } from './../../Interfaces/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from '../../Services/patients.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from 'src/app/Services/doctors.service';

@Component({
  selector: 'app-formpatient',
  templateUrl: './formpatient.component.html',
})
export class FormPatientComponent implements OnInit {
  patient: Patient;
  id: number;
  formPacient: FormGroup;
  roles: any;
  doctors: Doctor[];

  constructor(
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDoctor();
    this.getDoctors();
    this.getRoles();

    this.formPacient = this.fb.group({
      SSCode: [, [Validators.required, Validators.maxLength(11)]],
      login: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.maxLength(35)]],
      date_of_birth: ['', [Validators.required]],
      allergies: ['', [Validators.maxLength(400)]],
      cancer: ['', [Validators.maxLength(25)]],
      diseases: ['', [Validators.maxLength(50)]],
      role: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
    });
    this.getHero();
  }

  get formulario() {
    return this.formPacient.controls;
  }

  onSubmit() {

    this.patient = this.formPacient.value;

    if (this.id ){
    this.update( this.patient);
   }
    if (!this.id ){

    this.add(this.patient);
   }
    this.router.navigate(['/patients']);
   }



  add(patient: Patient): void {
    if (this.formPacient.invalid) {
      return;
    }
    this.patientsService.createPatient(patient);
  }

  update(patient: Patient): void {

    this.patientsService.updatePatient(patient, this.id);
  }

  getHero(): void {
    if (!this.id) {
      return;
    }
    this.patientsService.getPatient(this.id).subscribe((data) => {
      this.patient = data;
      this.formPacient.patchValue({
        SSCode: this.patient.SSCode,
        login: this.patient.login,
        password: this.patient.password,
        name: this.patient.name,
        lastname: this.patient.lastname,
        date_of_birth: this.patient.date_of_birth,
        allergies: this.patient.allergies,
        cancer: this.patient.cancer,
        diseases: this.patient.diseases,
        role: this.patient.role,
        doctor: this.patient.doctor,
      });
    });
  }

  getRoles(): void {
    this.patientsService.getRoles().subscribe(
      (data) =>{ this.roles = data;},
      (err) => console.log(err)
    );
  }
  getDoctors(): void {
    this.doctorsService.getAllDoctors().subscribe(
      (data) => (this.doctors = data),
      (err) => console.log(err)
    );
  }
  getDoctor(): void {
    this.doctorsService.getDoctor(+this.token.getId()).subscribe((data) => {
      this.formPacient.controls.doctor.setValue(data);
    });
  }
  compare(object1: any, object2: any): boolean {
    return object1 == null ||
      object2 == null ||
      // tslint:disable-next-line: triple-equals
      object1 == undefined ||
      // tslint:disable-next-line: triple-equals
      object2 == undefined
      ? false
      : object1.id === object2.id;
  }
}
