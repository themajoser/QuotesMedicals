import { PatientsService } from './../../Services/patients.service';
import { AppointmentsComponent } from './../../Components/appointment/appointment.component';
import {  Appointment } from '../../Interfaces/appointment';
import { Doctor } from '../../Interfaces/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { AppointmentsService } from 'src/app/Services/appointment.service';
import { Patient } from 'src/app/Interfaces/patient';

@Component({
  selector: 'app-formappointment',
  templateUrl: './formAppointment.component.html',
})
export class FormAppointmentComponent implements OnInit {
  appointment: Appointment;
  id: number;
  formAppointment: FormGroup;
  roles: any;
  doctors: Doctor[];
  patients: Patient[];

  constructor(
    private patientsService: PatientsService,
    private appointmentService: AppointmentsService,
    private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.getDoctors();
    this.getPatients();

    this.formAppointment = this.fb.group({
      assement: ['', [Validators.required, Validators.maxLength(255)]],
      status: ['', [Validators.required, Validators.maxLength(15)]],
      date: [, [Validators.required]],
      patient: [, [Validators.required]],
      doctor: [, [Validators.required]],
    });
    this.getAppointment();
  }

  get formulario() {
    return this.formAppointment.controls;
  }

  onSubmit() {




    this.appointment = this.formAppointment.value;

    if (this.id ){

    this.update( this.appointment);
    // this.router.navigate(['/appointments']);
   }else{
    if (this.formAppointment.invalid) {
      return;
    }
    console.log(this.appointment);
    this.add(this.appointment);
    // this.router.navigate(['/appointments']);
   }

  }

  add(appointment: Appointment): void {
    this.appointmentService.createAppointment(appointment);
  }

  update(appointment: Appointment): void {

    this.appointmentService.updateAppointment(appointment, this.id);
  }

  getAppointment(): void {
    if (!this.id) {
      return;
    }
    this.appointmentService.getAppointment(this.id).subscribe((data) => {
      this.appointment = data;
      this.formAppointment.patchValue({
        assement: this.appointment.assement,
        status: this.appointment.status,
        date: this.appointment.date,
        doctor: this.appointment.doctor,
        patient: this.appointment.patient
      });
    });
  }

  getPatients(): void {
    this.patientsService.getAllPatients().subscribe(
      (data) => (this.patients = data),
      (err) => console.log(err)
    );
  }
  getDoctors(): void {
    this.doctorsService.getAllDoctors().subscribe(
      (data) => (this.doctors = data),
      (err) => console.log(err)
    );
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
