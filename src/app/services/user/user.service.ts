/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
/*  IMPORTACIONES DE LOS SERVICIOS
/*====================================================================================*/
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
export class UserService {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Token del usuario (con un valor por defecto).
  /*----------------------------------------------------------------------------------*/
  token: string;
  /*----------------------------------------------------------------------------------*/
  /*  Variable de usuario.
  /*----------------------------------------------------------------------------------*/
  user: UserModel;
  /*----------------------------------------------------------------------------------*/
  /*  Evento para actualizar el usuario en otros componentes.
  /*----------------------------------------------------------------------------------*/
  @Output() userChanges: EventEmitter<UserModel>;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(
    private http: HttpClient,
    private router: Router,
    private imageService: ImageService
  ) {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = 'n0t4v4l1dt0k3n';
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userChanges = new EventEmitter();
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
  /*  FUNCIÓN PARA OBTENER LOS USUARIOS
  /*==================================================================================*/
  getUsers(page: number) {
    const URL = `${API_URL}/users/?offset=${page}`;
    return this.http.get(URL);
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BUSCAR USUARIOS
  /*==================================================================================*/
  searchUsers(keyword: string) {
    const URL = `${API_URL}/search/collection/users/${keyword}`;
    return this.http.get(URL).pipe(map((response: any) => response.users));
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
          this.saveLocalStorage(response.user._id, this.token, response.user);
          return response.user;
        }
      })
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN USUARIO
  /*==================================================================================*/
  editUser(user: UserModel) {
    const URL = `${API_URL}/users/${this.user._id}`;
    /*--------------------------------------------------------------------------------*/
    /*  Se realiza la petición.
    /*--------------------------------------------------------------------------------*/
    return this.http.put(URL, user).pipe(
      map((response: any) => {
        if (response.ok) {
          if (this.user._id === user._id) {
            this.saveLocalStorage(response.user._id, this.token, response.user);
          }
        }
        return response.user;
      })
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR LA IMAGEN DE UN USUARIO
|/*==================================================================================*/
  editImage(image: File) {
    return this.imageService.uploadImage(this.user._id, 'users', image).pipe(
      map((response: any) => {
        if (response.ok) {
          this.saveLocalStorage(response.users._id, this.token, response.users);
        }
        return response.users;
      })
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BORRAR UN USUARIO
  /*==================================================================================*/
  deleteUser(id: string) {
    const URL = `${API_URL}/users/${id}`;
    return this.http.delete(URL).pipe(map((response: any) => response.user));
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
      user.role ? user.role : 'USER_ROLE',
      user.google ? true : false
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
    this.userChanges.emit(this.user);
  }
}
