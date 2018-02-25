import { NgModule } from '@angular/core';
import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:"searchString"
})

@Injectable()
export class SearchPipe implements PipeTransform {

    transform(teachers: any[], searchString: string): any {
        return teachers.filter(teacher => teacher.teacherName.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
      }

}