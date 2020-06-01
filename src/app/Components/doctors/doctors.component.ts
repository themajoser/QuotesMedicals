import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../Services/Token.service';
import { LoginService } from './../../Services/Login.service';
import { DoctorsService } from './../../Services/doctors.service';
import { Doctor } from './../../Interfaces/doctor';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',

})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[];
  sortedData: Doctor[];
  filterPost = '';
  pageOfItems: Array<any>;
  config: any;
  num: any;

  constructor(private doctorsService: DoctorsService, private token: TokenService ) {

   }

  ngOnInit() {
    this.getDoctors();
    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: +this.num
    };
    console.log( this.num);

  }

  getDoctors(): void {
    this.doctorsService.getAllDoctors()
        .subscribe(Doctors => {this.doctors = Doctors;
                               this.sortedData = this.doctors.slice();
                               this.num = this.sortedData.length; });
  }


  delete(doctor: Doctor): void {

    this.doctors = this.doctors.filter(h => h !== doctor);
    this.doctorsService.deleteDoctor(doctor);

  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  sortData(sort: Sort) {
    const data = this.doctors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'lastname': return compare(a.lastname, b.lastname, isAsc);
        case 'date_of_birth': return compare(a.date_of_birth.toString(), b.date_of_birth.toString(), isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
















