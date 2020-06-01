import { Medicine } from 'src/app/Interfaces/medicine';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) { return value; }
    const resultPosts = [];
    for (const medicine of value) {
      if (medicine.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || medicine.assement.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultPosts.push(medicine);
      }
    }
    return resultPosts;
  }


}
