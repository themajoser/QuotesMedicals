import { PatientsService } from '../../Services/patients.service';
import { Patient } from '../../Interfaces/patient';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formpatient',
  templateUrl: './formpatient.component.html'
})
export class FormPatientComponent implements OnInit {
       @Input()  patient: Patient;
          id: number;

  constructor(private patientsService: PatientsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }


  // add(patient: Patient): void {
  //   if (!name) { return; }
  //   this.PatientsService.addPatient( patient)
  //     .subscribe(Patient => {
  //       this.Patients.push(Patient);
  //     });
  // }
  getPatients(): void {
    this.patientsService.getPatient(this.id)
        .subscribe( ( patient ) => this.patient = patient), {}
  }

}
