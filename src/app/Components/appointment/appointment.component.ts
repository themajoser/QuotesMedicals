import { AppointmentsService } from './../../Services/appointment.service';
import { LoginService } from './../../Services/Login.service';
import { HeaderComponent } from './../header/header.component';
import { Appointment } from './../../Interfaces/Appointment';
import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../Services/Token.service';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointment.component.html',
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[];
  sortedData: Appointment[];
  constructor(
    private appointmentsService: AppointmentsService,
    private Login: LoginService,
    public tokenService: TokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAppointmentsByDoctor();
   
  }
  showToaster(nombre: string) {
    this.toastr.success('Has eliminado la cita con ' + nombre + ' exitosamente');
  }

  getAppointments(): void {
    this.appointmentsService
      .getAllAppointments()
      .subscribe((Appointments) => {(this.appointments = Appointments);
       });
  }
  getAppointmentsByDoctor(): void {
    const id = this.tokenService.getId();
    this.appointmentsService
      .getAppointmentsByDoctor(+id)
      .subscribe((Appointments) => {
        this.appointments = Appointments;
        this.sortedData = this.appointments.slice();
      });
  }

  delete(appointment: Appointment): void {
    this.appointments = this.appointments.filter(h => h !== appointment);
    this.appointmentsService.deleteAppointment(appointment).subscribe();
    this.showToaster(appointment.patient.name);
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
