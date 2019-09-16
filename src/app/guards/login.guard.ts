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
export class LoginGuard implements CanActivate {
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private router: Router, private userService: UserService) {}
  /*==================================================================================*/
  /*  FUNCIÓN PARA COMPROBAR SI EL USUARIO HA INICIADO SESIÓN
  /*==================================================================================*/
  canActivate(): boolean {
    if (!this.userService.userLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    return this.userService.userLoggedIn();
  }
}
