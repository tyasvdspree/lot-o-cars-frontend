import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return (
        it.car.numberPlate.toLocaleLowerCase().includes(searchText) ||
        it.car.make.toLocaleLowerCase().includes(searchText) ||
        it.car.model.toLocaleLowerCase().includes(searchText)
      );
    });
  }
}
