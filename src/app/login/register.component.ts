/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { UserService } from '../services/user/user.service';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBERÍAS DE TERCEROS
/*====================================================================================*/
import Swal from 'sweetalert2';
/*====================================================================================*/
/*  COMPATIBILIDAD CON PLUGINS DE JAVASCRIPT
/*====================================================================================*/
declare function init_plugins();
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class RegisterComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
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
    /*--------------------------------------------------------------------------------*/
    /*  Creación del formulario.
    /*--------------------------------------------------------------------------------*/
    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        verify: new FormControl(null, Validators.required),
        conditions: new FormControl(false)
      },
      /*------------------------------------------------------------------------------*/
      /*  Verificación de la contraseña.
      /*------------------------------------------------------------------------------*/
      { validators: this.equals('password', 'verify') }
    );
    /*--------------------------------------------------------------------------------*/
    /*  Asignación de datos por defecto.
    /*--------------------------------------------------------------------------------*/
    // this.form.setValue({
    //   name: 'qwerty',
    //   email: 'qwerty@mail.com',
    //   password: 'qwerty',
    //   verify: 'qwerty',
    //   conditions: true
    // });
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA REGISTRAR UN USUARIO
  /*==================================================================================*/
  register() {
    /*--------------------------------------------------------------------------------*/
    /*  Se verifica que el formulario sea válido.
    /*--------------------------------------------------------------------------------*/
    if (this.form.valid) {
      if (this.form.value.conditions) {
        /*----------------------------------------------------------------------------*/
        /*  Se genera un usuario válido y se manda la petición.
        /*----------------------------------------------------------------------------*/
        const user = this.userService.generateUser(this.form.value);
        this.userService.saveUser(user).subscribe(
          (response: any) => {
            /*------------------------------------------------------------------------*/
            /*  Se notifica que el usuario se ha creado exitosamente.
            /*------------------------------------------------------------------------*/
            Swal.fire({
              title: '¡Usuario creado!',
              text: `El usuario ${response.name} se ha creado exitosamente.`,
              type: 'success',
              onClose: () => {
                this.router.navigateByUrl('/login');
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
        /*----------------------------------------------------------------------------*/
        /*  Se notifica al usuario que debe aceptar las condiciones.
        /*----------------------------------------------------------------------------*/
      } else {
        Swal.fire({
          title: '¡Un momento!',
          text: 'Debe aceptar los terminos y condiciones antes de continuar.',
          type: 'warning'
        });
      }
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA COMPROBAR QUE LAS CONTRASEÑAS SEAN IGUALES
  /*==================================================================================*/
  equals(password: string, verify: string) {
    return (group: FormGroup) => {
      /*------------------------------------------------------------------------------*/
      /*  Se obtienen los valores de los campos.
      /*------------------------------------------------------------------------------*/
      const pw1 = group.controls.password.value;
      const pw2 = group.controls.verify.value;
      /*------------------------------------------------------------------------------*/
      /*  Se comparan los valores.
      /*------------------------------------------------------------------------------*/
      if (pw1 === pw2) {
        return null;
      } else {
        return { notEquals: true };
      }
    };
  }
}
