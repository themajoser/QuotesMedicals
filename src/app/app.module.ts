import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { AppointmentsComponent } from './Components/appointment/appointment.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule } from '@angular/forms';
import { FormPatientComponent } from './Components/patients/formpatient.component';
import { FormsModule } from '@angular/forms';
import { FormAppointmentComponent } from './Components/appointment/formAppointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
   declarations: [
      AppComponent,
      PatientsComponent,
       FormPatientComponent,
       LoginComponent,
       HeaderComponent,
       AppointmentsComponent,
       FormAppointmentComponent,
       HomeComponent,
       MainComponent


   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MatSortModule,
      NgSelectModule


   ],
   providers: [HeaderComponent ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
