/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { HospitalModel } from 'src/app/models/hospital.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class SearchComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  users: UserModel[];
  hospitals: HospitalModel[];
  doctors: DoctorModel[];
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {
    /*--------------------------------------------------------------------------------*/
    /* Se obtiene la búsqueda del URL.
               /*--------------------------------------------------------------------------------*/
    this.route.params.subscribe((params: any) => {
      const URL = `${API_URL}/search/all/${params.keyword}`;
      /*------------------------------------------------------------------------------*/
      /* Se realiza la petición y se obtienen los valores.
                 /*------------------------------------------------------------------------------*/
      this.http.get(URL).subscribe((response: any) => {
        this.users = response.users;
        this.hospitals = response.hospitals;
        this.doctors = response.doctors;
      });
    });
  }
}
