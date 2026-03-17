import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'driveImg'
})
export class DriveImgPipe implements PipeTransform {

  transform(id: string): string {
    if (!id) return '';
    return `https://lh3.googleusercontent.com/d/${id}`;
  }

}