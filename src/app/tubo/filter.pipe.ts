import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any, col: string): any {
    if (arg === '' || arg.length < 3) { return value; }
    const resultPosts = [];
    for (const post of value) {
      if (post[col].toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }

}
