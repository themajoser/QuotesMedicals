import { FormDoctorComponent } from './Components/doctors/formDoctor.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { FormAppointmentComponent } from './Components/appointment/formAppointment.component';
import { FormAppointmentPatientComponent } from './Components/patients/appointment/formAppointmentPatient.component';
import { AppointmentsPatientComponent } from './Components/patients/appointment/appointmentPatient.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { AppointmentsComponent } from './Components/appointment/appointment.component';
import { AuthGuard } from './Services/AuthGuard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPatientComponent } from './Components/patients/formpatient.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { LoginComponent } from './Components/login/login.component';
import { MedicinesComponent } from './Components/medicines/medicines.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent  },


  {
    path: '',
    component: MainComponent,


    children: [
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor'] },
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor', 'patient'] },
      },
      {
        path: 'patients/create',
        component: FormPatientComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor'] },
      },
      { path: 'patients/edit/:id', component: FormPatientComponent },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor'] },
      },
      {
        path: 'appointmentsPatient',
        component: AppointmentsPatientComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['patient'] },
      },
      {
        path: 'appointments/create',
        component: FormAppointmentPatientComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['patient'] },
      },
      {
        path: 'appointment/create',
        component: FormAppointmentComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor'] },
      },
      {
        path: 'medicines',
        component: MedicinesComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor', 'admin'] },
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor', 'admin'] },
      },
      {
        path: 'doctors/create',
        component: FormDoctorComponent,
        canActivate: [AuthGuard],
        data: { roleCode: ['doctor'] },
      },
      { path: 'doctors/edit/:id', component: FormDoctorComponent },
      { path: 'appointments/edit/:id', component: FormAppointmentComponent },
      // {
      //   path: '/profile/patient/:id',
      //   component: MedicinesComponent,
      //   canActivate: [AuthGuard],
      //   data: { roleCode: ['doctor', 'admin'] },
      // },
      // {
      //   path: '/profile/patient/:id',
      //   component: FormPatientComponent,
      //   canActivate: [AuthGuard],
      //   data: { roleCode: ['patient'] },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
