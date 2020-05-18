import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule } from '@angular/forms';
import { FormPatientComponent } from './Components/patients/formpatient.component';
import { FormsModule } from '@angular/forms';



@NgModule({
   declarations: [
      AppComponent,
      PatientsComponent,
       FormPatientComponent,
       LoginComponent,
       HeaderComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      BrowserModule,
      FormsModule,

   ],
   providers: [HeaderComponent],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
