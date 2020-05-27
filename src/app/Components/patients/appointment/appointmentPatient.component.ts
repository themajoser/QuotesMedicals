import { AppointmentsService } from 'src/app/Services/appointment.service';
import { LoginService } from '../../../Services/Login.service';
import { TokenService } from '../../../Services/Token.service';
import { Appointment } from '../../../Interfaces/Appointment';




import { Component, OnInit } from '@angular/core';

import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointment.component.html',
})
export class AppointmentsPatientComponent implements OnInit {
  appointments: Appointment[];
  sortedData: Appointment[];
  constructor(
    private appointmentsService: AppointmentsService,
    private Login: LoginService,
    public tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getAppointmentsByPatient();

  }



  getAppointmentsByPatient(): void {
    const id = this.tokenService.getId();
    this.appointmentsService
      .getAppointmentsByPatient(+id)
      .subscribe((Appointments) => {
        this.appointments = Appointments;
        this.sortedData = this.appointments.slice();
      });
  }

  delete(appointment: Appointment): void {
    this.appointments = this.appointments.filter(h => h !== appointment);
    this.appointmentsService.deleteAppointment(appointment);
  }
  sortData(sort: Sort) {
    const data = this.appointments.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'assement':
          return compare(a.assement, b.assement, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'date':
          return compare(a.date.toString(), b.date.toString(), isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
