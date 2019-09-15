import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { DoctorModel } from 'src/app/models/doctor.model';
import { ImageService } from 'src/app/services/image/image.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient, private imageService: ImageService) {}

  getDoctors(page: number) {
    const URL = `${API_URL}/doctors/?offset=${page}`;
    return this.http.get(URL);
  }

  getDoctor(id: string) {
    const URL = `${API_URL}/doctors/${id}`;
    return this.http.get(URL).pipe(map((response: any) => response.doctor));
  }

  searchDoctors(keyword: string) {
    const URL = `${API_URL}/search/collection/doctors/${keyword}`;
    return this.http.get(URL).pipe(map((response: any) => response.doctors));
  }

  saveDoctor(name: string, hospital?: string) {
    const doctor = new DoctorModel(name, null, hospital);
    const URL = `${API_URL}/doctors`;
    return this.http
      .post(URL, doctor)
      .pipe(map((response: any) => response.doctor));
  }

  editDoctor(doctor: DoctorModel) {
    const URL = `${API_URL}/doctors/${doctor._id}`;
    return this.http
      .put(URL, doctor)
      .pipe(map((response: any) => response.doctor));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR LA IMAGEN DE UN USUARIO
  /*==================================================================================*/
  editImage(id: string, image: File) {
    return this.imageService
      .uploadImage(id, 'doctors', image)
      .pipe(map((response: any) => response.doctors));
  }
  deleteDoctor(id: string) {
    const URL = `${API_URL}/doctors/${id}`;
    return this.http.delete(URL).pipe(map((response: any) => response.doctor));
  }
}
