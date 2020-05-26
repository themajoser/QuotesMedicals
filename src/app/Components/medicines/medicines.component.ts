import { MedicineService } from './../../Services/medicine.service';

import { LoginService } from './../../Services/Login.service';
import { HeaderComponent } from './../header/header.component';
import { Medicine } from './../../Interfaces/Medicine';
import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../Services/Token.service';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
})
export class MedicinesComponent implements OnInit {
  role:String;
  medicines: Medicine[];
  sortedData: Medicine[];
  filterPost = '';
  constructor(
    private medicinesService: MedicineService,
    private Login: LoginService,
    public tokenService: TokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getMedicines();
  }
  showToaster(nombre: string) {
    this.toastr.success('Has eliminado el medicamento  ' + nombre + ' exitosamente');
  }

  getMedicines(): void {
    this.medicinesService
      .getAllMedicines()
      .subscribe(Medicines => {
        this.medicines = Medicines;
        this.sortedData = this.medicines.slice();

        });
  }


  delete(medicine: Medicine): void {
    this.medicines = this.medicines.filter(h => h !== medicine);
    this.medicinesService.deleteMedicine(medicine).subscribe();
    this.showToaster(medicine.name);
  }
  sortData(sort: Sort) {
    const data = this.medicines.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'brand':
          return compare(a.brand, b.brand, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
