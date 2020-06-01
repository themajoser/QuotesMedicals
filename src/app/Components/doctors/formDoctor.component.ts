import { Role } from './../../Interfaces/role';
import { DoctorsService } from './../../Services/doctors.service';

import { TokenService } from './../../Services/Token.service';
import { Doctor } from './../../Interfaces/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formdoctor',
  templateUrl: './formDoctor.component.html'
})
export class FormDoctorComponent implements OnInit {

  doctor: Doctor;
  id: number;
  formDoctor: FormGroup;
  roles: Role[];
  doctors: Doctor[];

  constructor(
    private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,

  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDoctor();
    this.getRoles();


    this.formDoctor = this.fb.group({
      SSCode: [, [Validators.required, Validators.maxLength(11)]],
      login: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9]+([A-Za-z0-9]*|[_-]?[A-Za-z0-9]+)*$')]],
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Záéíóúñ ]*')]],
      lastname: ['', [Validators.required, Validators.maxLength(35), Validators.pattern('[a-zA-Záéíóúñ ]*')]],
      date_of_birth: ['', [Validators.required]],
      speciality: ['', [Validators.required, Validators.maxLength(25)]],
      role: [   this.getRoles(), [Validators.required]],

    });

    this.checkPassword();

  }

  get formulario() {
    return this.formDoctor.controls;
  }

  onSubmit() {

    this.doctor = this.formDoctor.value;

    if (this.id ){
    this.update( this.doctor);
   }
    if (!this.id ){

    this.add(this.doctor);
   }
    this.router.navigate(['/doctors']);
   }



  add(doctor: Doctor): void {
    if (this.formDoctor.invalid) {
      return;
    }
    this.doctorsService.createDoctor(doctor);

  }

  update(doctor: Doctor): void {

    this.doctorsService.updateDoctor(doctor, this.id);
  }


  getDoctor(): void {
    if (!this.id) {
      return;
    }
    this.doctorsService.getDoctor(this.id).subscribe((data) => {
      this.doctor = data;
      this.formDoctor.patchValue({
        login: this.doctor.login,
        password: '',
        name: this.doctor.name,
        lastname: this.doctor.lastname,
        date_of_birth: this.doctor.date_of_birth,
        speciality: this.doctor.speciality,
        role: this.doctor.role,

      });
    });
  }
  checkPassword():void{
    if(this.id){
      this.formDoctor.addControl('password', this.fb.control('',
      [ Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&|\\.])[A-Za-z\\d@$!%|\\.*?&]{8,}$')]));
    }else{
      this.formDoctor.addControl('password', this.fb.control('',[ Validators.required, Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&|\\.])[A-Za-z\\d@$!%|\\.*?&]{8,}$')]));
    }
  }

  getRoles(): void {
    this.doctorsService.getRoles().subscribe(
      (data) => { this.roles = data; },
      (err) => console.log(err)
    );
  }


  compare(object1: any, object2: any): boolean {
    return object1 == null ||
      object2 == null ||
      // tslint:disable-next-line: triple-equals
      object1 == undefined ||
      // tslint:disable-next-line: triple-equals
      object2 == undefined
      ? false
      : object1.id === object2.id;
  }
}
