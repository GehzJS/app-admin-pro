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
import { UserModel } from 'src/app/models/user.model';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBRERÍAS DE TERCEROS.
/*====================================================================================*/
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
/*====================================================================================*/
/*  CONFIGURACIONES DEL SERVICIO
/*====================================================================================*/
@Injectable({
  providedIn: 'root'
})
/*====================================================================================*/
/*  INICIO DEL SERVICIO
/*====================================================================================*/
export class UserService {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Token del usuario (con un valor por defecto).
  /*----------------------------------------------------------------------------------*/
  token: string;
  user: UserModel;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = 'n0t4v4l1dt0k3n';
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA INICIAR SESIÓN CON GOOGLE
  /*==================================================================================*/
  userLoggedIn() {
    return this.token !== 'n0t4v4l1dt0k3n' && this.token.length > 20;
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA INICIAR SESIÓN CON GOOGLE
  /*==================================================================================*/
  loginGoogle() {
    const URL = `${API_URL}/login/google`;
    return this.http.post(URL, null).pipe(
      map((response: any) => {
        this.saveLocalStorage(response.user._id, response.token, response.user);
        return response;
      })
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA INICIAR SESIÓN DE MANERA LOCAL
  /*==================================================================================*/
  loginLocal(user: UserModel, remember: boolean) {
    const URL = `${API_URL}/login`;
    return this.http.post(URL, user).pipe(
      map((response: any) => {
        this.saveLocalStorage(response.user._id, response.token, response.user);
        if (remember) {
          localStorage.setItem('email', response.user.email);
        } else {
          localStorage.removeItem('email');
        }
        return response;
      })
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA CERRAR SESIÓN
  /*==================================================================================*/
  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GUARGAR UN USUARIO
  /*==================================================================================*/
  saveUser(user: UserModel) {
    const URL = `${API_URL}/users`;
    /*--------------------------------------------------------------------------------*/
    /*  Se realiza la petición.
    /*--------------------------------------------------------------------------------*/
    return this.http.post(URL, user).pipe(
      map((response: any) => {
        if (response.ok) {
          return response.user;
        }
      })
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GENERAR UN USUARIO VÁLIDO
  /*==================================================================================*/
  generateUser(user: any) {
    return new UserModel(
      user.name,
      user.email,
      user.password,
      user.image ? user.image : null,
      user.role ? user.role : 'USER_ROLE'
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GUARDAR LOS DATOS DEL USUARIO DE FORMA LOCAL
  /*==================================================================================*/
  saveLocalStorage(id: string, token: string, user: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }
}
