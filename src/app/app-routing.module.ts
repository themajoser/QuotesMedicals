import { AppointmentsComponent } from './Components/appointment/appointment.component';
import { AuthGuard } from './Services/AuthGuard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPatientComponent } from './Components/patients/formpatient.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { LoginComponent  } from './Components/login/login.component';
import { FormAppointmentComponent } from './Components/appointment/formAppointment.component';
const routes: Routes = [
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard], data: {roleCode: 'doctor'}
  },
  { path: 'patients/create', component: FormPatientComponent, canActivate: [AuthGuard], data: {roleCode: 'doctor'} },
  { path: 'patients/edit/:id', component: FormPatientComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard], data: {roleCode: 'doctor'}
},
{ path: 'appointments/create', component: FormAppointmentComponent, canActivate: [AuthGuard], data: {roleCode: 'doctor'} },
{ path: 'appointments/edit/:id', component: FormAppointmentComponent },
   { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
