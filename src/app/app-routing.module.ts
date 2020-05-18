import { AuthGuard } from './Services/AuthGuard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPatientComponent } from './Components/patients/formpatient.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { LoginComponent  } from './Components/login/login.component';
const routes: Routes = [
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard], data: {roleCode: 'doctor'}
  },
  { path: 'patients/create', component: FormPatientComponent, canActivate: [AuthGuard], data: {roleCode: 'doctor'} },
  { path: 'patients/edit/:id', component: FormPatientComponent },
   { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
