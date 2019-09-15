/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
/*====================================================================================*/
/*  IMPORTACIONES DE RXJS
/*====================================================================================*/
import { Observable } from 'rxjs';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { UserService } from 'src/app/services/user/user.service';
import { catchError } from 'rxjs/operators';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Injectable()
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class AuthHttpInterceptor implements HttpInterceptor {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Token usado en las peticiones.
  /*----------------------------------------------------------------------------------*/
  token: string;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(public userService: UserService) {
    this.token = this.userService.token;
  }
  /*==================================================================================*/
  /*  FUNCIÓN QUE INYECTA EL TOKEN EN LOS HEADERS
  /*==================================================================================*/
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /*--------------------------------------------------------------------------------*/
    /*  Se inyecta el token obtenido en los headers.
    /*--------------------------------------------------------------------------------*/
    const authRequest = request.clone({
      headers: request.headers.set('Token', this.token)
    });
    /*--------------------------------------------------------------------------------*/
    /*  Se continúa con la ruta si es permitido.
    /*--------------------------------------------------------------------------------*/
    return next.handle(authRequest).pipe(
      catchError((error, caught) => {
        return Observable.throw(error);
      })
    ) as any;
  }
}