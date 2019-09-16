/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { UserService } from 'src/app/services/user/user.service';
/*====================================================================================*/
/*  CONFIGURACIONES DEL GUARD
/*====================================================================================*/
@Injectable({
  providedIn: 'root'
})
/*====================================================================================*/
/*  INICIO DEL GUARD
/*====================================================================================*/
export class VerifyTokenGuard implements CanActivate {
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private userService: UserService) {}
  /*==================================================================================*/
  /*  FUNCIÓN PARA COMPROBAR SI EL USUARIO TIENE UN TOKEN VÁLIDO
  /*==================================================================================*/
  canActivate(): Promise<boolean> | boolean {
    /*--------------------------------------------------------------------------------*/
    /* Se obtiene el token y se extraen los datos.
    /*--------------------------------------------------------------------------------*/
    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = this.expired(payload.exp);
    /*--------------------------------------------------------------------------------*/
    /* Se verifica si el token aún es válido.
    /*--------------------------------------------------------------------------------*/
    if (expired) {
      this.userService.logout();
      return false;
    }
    return this.verify(payload.exp);
  }
  /*==================================================================================*/
  /*  FUNCIÓN QUE INDICA SI EL TOKEN YA HA VENCIDO
  /*==================================================================================*/
  expired(date: number) {
    const now = new Date().getTime() / 1000; // Milisegundos a segundos.
    return date < now ? true : false;
  }
  /*==================================================================================*/
  /*  FUNCIÓN QUE COMPRUEBA LA VALIDEZ DEL TOKEN Y LO RENUEVA
  /*==================================================================================*/
  verify(date: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      /*------------------------------------------------------------------------------*/
      /* Se obtienen las fechas para realizar la comrpobación.
      /*------------------------------------------------------------------------------*/
      const expired = new Date(date * 1000); // Segundos a milisegundos.
      const now = new Date();
      now.setTime(now.getTime() + 3600 * 1000); // Se le suman x horas a la actual.
      /*------------------------------------------------------------------------------*/
      /* Se verifica si el token es válido o debe renovarse.
      /*------------------------------------------------------------------------------*/
      if (expired.getTime() < now.getTime()) {
        resolve(true);
      } else {
        this.userService
          .renewToken()
          .subscribe(() => resolve(true), () => reject(false));
      }
    });
  }
}
