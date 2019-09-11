/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
/*====================================================================================*/
/*  CONFIGURACIONES DEL SERVICIO
/*====================================================================================*/
@Injectable({
  providedIn: 'root'
})
/*====================================================================================*/
/*  INICIO DEL SERVICIO
/*====================================================================================*/
export class SettingsService {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(@Inject(DOCUMENT) private document) {}
  /*==================================================================================*/
  /*  FUNCIÓN PARA GUARDAR LA CONFIGURACIÓN DEL TEMA
  /*==================================================================================*/
  saveConfig(name: string, theme: any) {
    this.setTheme(theme);
    localStorage.setItem(name, JSON.stringify(theme));
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA LEER LA CONFIGURACIÓN DEL TEMA
  /*==================================================================================*/
  readConfig(name: string) {
    const theme = JSON.parse(localStorage.getItem(name));
    return theme ? theme : 'default';
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA APLICAR EL TEMA
  /*==================================================================================*/
  setTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this.document.getElementById('theme').setAttribute('href', url);
  }
}
