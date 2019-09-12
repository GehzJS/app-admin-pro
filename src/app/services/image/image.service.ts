import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(id: string, collection: string, image: File) {
    const URL = `${API_URL}/upload/${collection}/${id}`;
    const data = new FormData();
    const request = new XMLHttpRequest();
    data.append('image', image, image.name);
    return this.http.put(URL, data, { reportProgress: true });
  }
}
