/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBERÍAS DE TERCEROS
/*====================================================================================*/
import Swal from 'sweetalert2';
/*====================================================================================*/
/*  COMPATIBILIDAD CON PLUGINS DE JAVASCRIPT
/*====================================================================================*/
declare function init_plugins();
declare const gapi: any;
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class LoginComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Objeto para usar el API de Google.
  /*----------------------------------------------------------------------------------*/
  auth2: any;
  /*----------------------------------------------------------------------------------*/
  /*  Control del formulario.
  /*----------------------------------------------------------------------------------*/
  form: FormGroup;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private router: Router, private userService: UserService) {
    if (this.userService.userLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {
    init_plugins();
    this.googleInit();
    /*--------------------------------------------------------------------------------*/
    /*  Se crea el formulario.
    /*--------------------------------------------------------------------------------*/
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(false)
    });
    /*--------------------------------------------------------------------------------*/
    /*  Se asignan los valores al formulario si el usuario marcó el recordar su correo.
    /*--------------------------------------------------------------------------------*/
    const email = localStorage.getItem('email');
    if (email) {
      this.form.controls.email.setValue(email);
      this.form.controls.remember.setValue(true);
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE CONFIGURACIÓN DE GOOGLE
  /*==================================================================================*/
  googleInit() {
    gapi.load('auth2', () => {
      /*------------------------------------------------------------------------------*/
      /* Se establece a configuración para poder usar el inicio de sesión de Google.
      /*------------------------------------------------------------------------------*/
      this.auth2 = gapi.auth2.init({
        client_id:
          '16282722736-res20kl0qe8lfjsreg6ubm3jaj9isrnj.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      /*------------------------------------------------------------------------------*/
      /* Se obtiene el elemento HTML del botón de Google para asignarle la funcionalidad.
      /*------------------------------------------------------------------------------*/
      this.attachSignIn(document.getElementById('googleSignIn'));
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE FUNCIONALIDAD DE INICIO DE SESIÓN CON GOOGLE
  /*==================================================================================*/
  attachSignIn(element) {
    /*--------------------------------------------------------------------------------*/
    /*  Se obtiene el token del usuario de Google.
    /*--------------------------------------------------------------------------------*/
    this.auth2.attachClickHandler(element, {}, user => {
      // const profile = user.getBasicProfile();
      // console.log(profile);
      const token = user.getAuthResponse().id_token;
      this.userService.token = token;
      this.userService.loginGoogle().subscribe(
        (response: any) => {
          /*------------------------------------------------------------------------*/
          /*  Se notifica que el usuario se ha creado exitosamente.
        /*------------------------------------------------------------------------*/
          Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            text: `Bienvenido ${response.user.name}.`,
            type: 'success',
            onClose: () => {
              // this.router.navigateByUrl('/dashboard');
              window.location.href = '/dashboard';
            }
          });
        },
        (error: any) => {
          /*--------------------------------------------------------------------------*/
          /*  Se notifica al usuario que ha ocurrido un error.
          /*--------------------------------------------------------------------------*/
          Swal.fire({
            title: '¡Algo ha ido mal!',
            text: error.error.message,
            type: 'error'
          });
        }
      );
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO DE SESIÓN
  /*==================================================================================*/
  login() {
    if (this.form.valid) {
      const user = this.userService.generateUser(this.form.value);
      this.userService
        .loginLocal(user, this.form.controls.remember.value)
        .subscribe(
          (response: any) => {
            /*------------------------------------------------------------------------*/
            /*  Se notifica que el usuario se ha creado exitosamente.
            /*------------------------------------------------------------------------*/
            Swal.fire({
              title: '¡Inicio de sesión exitoso!',
              text: `Bienvenido ${response.user.name}.`,
              type: 'success',
              onClose: () => {
                // this.router.navigateByUrl('/dashboard');
                window.location.href = '/dashboard';
              }
            });
          },
          (error: any) => {
            /*--------------------------------------------------------------------------*/
            /*  Se notifica al usuario que ha ocurrido un error.
            /*--------------------------------------------------------------------------*/
            Swal.fire({
              title: '¡Algo ha ido mal!',
              text: 'Las credenciales no son válidas.',
              type: 'error'
            });
          }
        );
    }
  }
}
