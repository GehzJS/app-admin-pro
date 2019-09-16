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
import { HospitalModel } from 'src/app/models/hospital.model';
/*====================================================================================*/
/*  CONFIGURACIONES DEL SERVICIO
/*====================================================================================*/
@Injectable({
  providedIn: 'root'
})
/*====================================================================================*/
/*  INICIO DEL SERVICIO
/*====================================================================================*/
export class HospitalService {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private http: HttpClient) {}
  /*==================================================================================*/
  /*  FUNCIÓN PARA OBTENER LOS HOSPITALES
  /*==================================================================================*/
  getHospitals(page?: number) {
    const URL = `${API_URL}/hospitals/?offset=${page}`;
    return this.http.get(URL);
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA OBTENER UN HOSPITAL
  /*==================================================================================*/
  getHospital(id: string) {
    const URL = `${API_URL}/hospitals/${id}`;
    return this.http.get(URL).pipe(map((response: any) => response.hospital));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BUSCAR UN HOSPITAL
  /*==================================================================================*/
  searchHospitals(keyword: string) {
    const URL = `${API_URL}/search/collection/hospitals/${keyword}`;
    return this.http.get(URL).pipe(map((response: any) => response.hospitals));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GUARDAR UN HOSPITAL
  /*==================================================================================*/
  saveHospital(name: string) {
    const hospital = new HospitalModel(name);
    const URL = `${API_URL}/hospitals`;
    return this.http
      .post(URL, hospital)
      .pipe(map((response: any) => response.hospital));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN HOSPITAL
  /*==================================================================================*/
  editHospital(hospital: HospitalModel) {
    const URL = `${API_URL}/hospitals/${hospital._id}`;
    return this.http
      .put(URL, hospital)
      .pipe(map((response: any) => response.hospital));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BORRAR UN DOCTOR
  /*==================================================================================*/
  deleteHospital(id: string) {
    const URL = `${API_URL}/hospitals/${id}`;
    return this.http
      .delete(URL)
      .pipe(map((response: any) => response.hospital));
  }
}
