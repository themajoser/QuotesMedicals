import { HomeComponent } from './Components/home/home.component';
import { AppointmentsComponent } from './Components/appointment/appointment.component';
import { AuthGuard } from './Services/AuthGuard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPatientComponent } from './Components/patients/formpatient.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { LoginComponent  } from './Components/login/login.component';
import { FormAppointmentComponent } from './Components/appointment/formAppointment.component';
const routes: Routes = [
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard], data: {roleCode: ['doctor']}
  },
  { path: 'patients/create', component: FormPatientComponent, canActivate: [AuthGuard], data: {roleCode: ['doctor']} },
  { path: 'patients/edit/:id', component: FormPatientComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard], data: {roleCode: ['doctor']}
},
{ path: 'appointments/create', component: FormAppointmentComponent, canActivate: [AuthGuard], data: {roleCode: ['doctor']} },
{ path: 'appointments/edit/:id', component: FormAppointmentComponent },
   { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roleCode: ['doctor', 'patient']} },
  { path: '',  redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
