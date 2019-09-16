/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/*====================================================================================*/
/*  IMPORTACIONES DE RXJS
/*====================================================================================*/
import { map } from 'rxjs/operators';
/*====================================================================================*/
/*  IMPORTACIONES DE LAS VARIABLES DE ENTORNO
/*====================================================================================*/
import { API_URL } from 'src/app/config/config';
/*====================================================================================*/
/*  IMPORTACIONES DE LOS MODELOS
/*====================================================================================*/
import { DoctorModel } from 'src/app/models/doctor.model';
import { ImageService } from 'src/app/services/image/image.service';
/*====================================================================================*/
/*  CONFIGURACIONES DEL SERVICIO
/*====================================================================================*/
@Injectable({
  providedIn: 'root'
})
/*====================================================================================*/
/*  INICIO DEL SERVICIO
/*====================================================================================*/
export class DoctorService {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private http: HttpClient, private imageService: ImageService) {}
  /*==================================================================================*/
  /*  FUNCIÓN PARA OBTENER LOS DOCTORES
  /*==================================================================================*/
  getDoctors(page: number) {
    const URL = `${API_URL}/doctors/?offset=${page}`;
    return this.http.get(URL);
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA OBTENER UN DOCTOR
  /*==================================================================================*/
  getDoctor(id: string) {
    const URL = `${API_URL}/doctors/${id}`;
    return this.http.get(URL).pipe(map((response: any) => response.doctor));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BUSCAR UN DOCTOR
  /*==================================================================================*/
  searchDoctors(keyword: string) {
    const URL = `${API_URL}/search/collection/doctors/${keyword}`;
    return this.http.get(URL).pipe(map((response: any) => response.doctors));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GUARDAR UN DOCTOR
  /*==================================================================================*/
  saveDoctor(name: string, hospital?: string) {
    const doctor = new DoctorModel(name, null, hospital);
    const URL = `${API_URL}/doctors`;
    return this.http
      .post(URL, doctor)
      .pipe(map((response: any) => response.doctor));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN DOCTOR
  /*==================================================================================*/
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
  /*==================================================================================*/
  /*  FUNCIÓN PARA BORRAR UN DOCTOR
  /*==================================================================================*/
  deleteDoctor(id: string) {
    const URL = `${API_URL}/doctors/${id}`;
    return this.http.delete(URL).pipe(map((response: any) => response.doctor));
  }
}
