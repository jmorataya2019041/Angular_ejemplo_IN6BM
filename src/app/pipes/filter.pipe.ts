import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultPost = [];
    for(const usuarios of value){
      if(usuarios.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPost.push(usuarios);
      }
    }
    return resultPost;
  }

}
