import { Doctor } from './../../Interfaces/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from '../../Services/patients.service';
import { Patient } from '../../Interfaces/patient';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getDoctors();
    this.getRoles();
    this.id = +this.route.snapshot.paramMap.get('id');

    this.formPacient = this.fb.group({
      SSCode: [12, [Validators.required, Validators.maxLength(11)]],
      login: ['dfadsfad', [Validators.required, Validators.minLength(8)]],
      password: ['ggdsdfdsa', [Validators.required, Validators.minLength(8)]],
      name: ['adsfasdf', [Validators.required, Validators.maxLength(20)]],
      lastname: ['dsfdsadsf', [Validators.required, Validators.maxLength(35)]],
      date_of_birth: [ 'null', [Validators.required]],
      allergies: ['dsfasdgsffhfg', [Validators.maxLength(400)]],
      cancer: ['hjgddghf', [Validators.maxLength(25)]],
      diseases: ['gghfgffg', [Validators.maxLength(50)]],
      role: ['', [Validators.required]],
      doctor: ['', [Validators.required]]
    });
  }

  get formulario() {
    return this.formPacient.controls;
  }

  onSubmit() {
    if (this.formPacient.invalid) {
      return;
    }

    this.patient = this.formPacient.value;


    this.add(this.patient);

    // alert("Correo Enviado \nEliminamos el formulario");
  }

  add(patient: Patient): void {
    this.patientsService.createPatient(patient);
  }
  getRoles(): void {
    this.patientsService.getRoles().subscribe(
      (data) => (this.roles = data),
      (err) => console.log(err)
    );
  }
  getDoctors(): void {
    this.doctorsService.getAllDoctors().subscribe(
      (data) => (this.doctors = data),
      (err) => console.log(err)
    );
  }
}
