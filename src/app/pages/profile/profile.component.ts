/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { UserService } from 'src/app/services/user/user.service';
/*====================================================================================*/
/*  IMPORTACIONES DE MODELOS
/*====================================================================================*/
import { UserModel } from 'src/app/models/user.model';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBERÍAS DE TERCEROS
/*====================================================================================*/
import Swal from 'sweetalert2';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class ProfileComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Control del formulario.
  /*----------------------------------------------------------------------------------*/
  form: FormGroup;
  /*----------------------------------------------------------------------------------*/
  /*  Variable del usuario.
  /*----------------------------------------------------------------------------------*/
  user: UserModel;
  /*----------------------------------------------------------------------------------*/
  /*  Variable de la imagen.
  /*----------------------------------------------------------------------------------*/
  image: File;
  temporal: any;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(private userService: UserService) {
    this.user = this.userService.user;
    this.userService.userChanges.subscribe((response: UserModel) => {
      this.user = response;
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {
    /*--------------------------------------------------------------------------------*/
    /*  Creación del formulario.
    /*--------------------------------------------------------------------------------*/
    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(
          { value: null, disabled: this.user.google ? true : false },
          [Validators.required, Validators.email]
        ),
        password: new FormControl('', Validators.required),
        verify: new FormControl(null, Validators.required)
      },
      /*------------------------------------------------------------------------------*/
      /*  Verificación de la contraseña.
      /*------------------------------------------------------------------------------*/
      { validators: this.equals('password', 'verify') }
    );
    /*--------------------------------------------------------------------------------*/
    /*  Asignación de datos por defecto.
    /*--------------------------------------------------------------------------------*/
    if (this.user) {
      this.form.controls.name.setValue(this.user.name);
      this.form.controls.email.setValue(this.user.email);
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN USUARIO
  /*==================================================================================*/
  edit() {
    if (this.form.valid) {
      const newUser = this.userService.generateUser({
        name: this.form.controls.name.value,
        email: this.user.google
          ? this.user.email
          : this.form.controls.email.value,
        password: this.form.controls.password.value
      });
      this.userService.editUser(newUser).subscribe(
        (response: any) => {
          /*------------------------------------------------------------------------*/
          /*  Se notifica que el usuario se ha editado exitosamente.
          /*------------------------------------------------------------------------*/
          Swal.fire({
            title: '¡Usuario editado!',
            text: `El usuario ${response.name} se ha editado exitosamente.`,
            type: 'success'
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

  charged(image: File) {
    if (image) {
      if (image.type.indexOf('image') >= 0) {
        this.image = image;
        const reader = new FileReader();
        const temporalUrl = reader.readAsDataURL(image);
        reader.onloadend = () => (this.temporal = reader.result);
      } else {
        this.image = undefined;
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
        /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Un momento!',
          text: 'El archivo seleccionado no es una imagen.',
          type: 'warning'
        });
      }
    }
  }

  editImage() {
    this.userService.editImage(this.image).subscribe(
      (response: any) => {
        /*------------------------------------------------------------------------*/
        /*  Se notifica que el usuario se ha editado exitosamente.
        /*------------------------------------------------------------------------*/
        Swal.fire({
          title: 'Imagen editada!',
          text: `La imagen del perfil ${response.name} se ha editado exitosamente.`,
          type: 'success'
        });
      },
      (error: any) => {
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
        /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Algo ha ido mal!',
          text: 'Ha ocurrido un error al editar la imagen.',
          type: 'error'
        });
      }
    );
  }
}
