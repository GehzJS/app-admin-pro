import { Pipe, PipeTransform } from '@angular/core';
import { API_URL } from 'src/app/config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(image: string, type: string = 'users'): any {
    if (image) {
      if (image.indexOf('https') >= 0) {
        return image;
      }
    } else {
      image = 'noImage';
    }
    const URL = `${API_URL}/images/${type}/${image}`;
    return URL;
  }
}
