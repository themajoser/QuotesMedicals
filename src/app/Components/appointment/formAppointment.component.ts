import { MedicineService } from './../../Services/medicine.service';
import { TokenService } from './../../Services/Token.service';
import { PatientsService } from './../../Services/patients.service';
import { Appointment } from '../../Interfaces/appointment';
import { Doctor } from '../../Interfaces/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { AppointmentsService } from 'src/app/Services/appointment.service';
import { Patient } from 'src/app/Interfaces/patient';
import { Medicine } from 'src/app/Interfaces/medicine';
import {formatDate} from '@angular/common';
import { LOCALE_ID } from '@angular/core';
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
  medicines: Medicine[];

  constructor(
    private patientsService: PatientsService,
    private appointmentService: AppointmentsService,
    private doctorsService: DoctorsService,
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.getDoctors();
    this.getPatients();



    this.formAppointment = this.fb.group({
      assement: ['', [Validators.required, Validators.maxLength(255)]],
      status: ['', [Validators.required, Validators.maxLength(15)]],
      date: ['', [Validators.required]],
      patient: [, [Validators.required]],
      doctor: [this.getDoctor(), [Validators.required]],
      medicines: [this.getMedicines(), [Validators.required]]
    });

    this.getAppointment();

  }

  get formulario() {
    return this.formAppointment.controls;
  }

  onSubmit() {
    this.appointment = this.formAppointment.value;

    if (this.id) {
      this.update(this.appointment);
    }

    if (!this.id) {
      this.add(this.appointment);
    }

    this.router.navigate(['/appointments']);
  }

  add(appointment: Appointment): void {
    if (this.formAppointment.invalid) {
      return;
    }
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
        date: formatDate(this.appointment.date,"yyyy-MM-ddThh:mm","en-US"),
        doctor: this.appointment.doctor,
        patient: this.appointment.patient,
        medicines:this.appointment.medicines
      });

    });

  }

  getPatients(): void {
    this.patientsService.getAllPatientsByDoctor(+this.token.getId()).subscribe(
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
  getMedicines(): void {
    this.medicineService.getAllMedicines().subscribe(
      (data) => (this.medicines = data),
      (err) => console.log(err)
    );
  }

  getDoctor(): void {
    this.doctorsService.getDoctor(+this.token.getId()).subscribe((data) => {
      this.formAppointment.controls.doctor.setValue(data);
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
