import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr:any[],searchText:String): any {
    return arr.filter( (item)=> item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) );
  }

}
