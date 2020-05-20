import { AppointmentsService } from './../../Services/appointment.service';
import { LoginService } from './../../Services/Login.service';
import { HeaderComponent } from './../header/header.component';
import { Appointment } from './../../Interfaces/Appointment';
import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../Services/Token.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointment.component.html',
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[];

  constructor(private appointmentsService: AppointmentsService, private Login: LoginService,  public tokenService: TokenService ) { }

  ngOnInit() {
    this.getAppointmentsByDoctor();
    
  }
  getAppointments(): void {
    this.appointmentsService.getAllAppointments()
        .subscribe(Appointments => [this.appointments = Appointments]);
  }
  getAppointmentsByDoctor(): void {
      const id = this.tokenService.getId();
      this.appointmentsService.getAppointmentsByDoctor( +id )
          .subscribe(Appointments => [this.appointments = Appointments]);
  }



  delete(patient: Appointment): void {
    this.appointments = this.appointments.filter(h => h !== patient);
    this.appointmentsService.deleteAppointment(patient).subscribe();
  }













}
