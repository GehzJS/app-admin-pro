/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
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
import { ContentComponent } from '../../components/content/content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/*====================================================================================*/
/*  CONFIGURACIONES DEL SERVICIO
/*====================================================================================*/
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL SERVICIO
/*====================================================================================*/
export class UsersComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Variable de usuarios.
  /*----------------------------------------------------------------------------------*/
  users: UserModel[] = [];
  total: number;
  page: number;
  cargando: boolean;
  id: string;
  roles: any[] = ['USER_ROLE', 'ADMIN_ROLE'];
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.id = localStorage.getItem('id');
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {
    this.page = 0;
    this.total = 5;
    this.loadData(0);
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GARGAR LOS USUARIOS
  /*==================================================================================*/
  loadData(page: number) {
    this.cargando = true;
    this.page += page;
    if (this.page < 0 || this.page >= this.total) {
      return;
    }
    this.userService.getUsers(this.page).subscribe((response: any) => {
      this.cargando = false;
      this.users = response.users;
      this.total = response.total;
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BUSCAR USUARIOS
  /*==================================================================================*/
  searchUser(keyword: string) {
    if (keyword !== '') {
      this.userService
        .searchUsers(keyword)
        .subscribe((response: UserModel[]) => {
          this.users = response;
        });
    } else {
      this.loadData(0);
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN USUARIO
  /*==================================================================================*/
  edit(user: UserModel) {
    this.userService.editUser(user).subscribe(
      (response: any) => {
        this.loadData(this.page);
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
          text: 'Ha ocurrido un error al editar el usuario.',
          type: 'error'
        });
      }
    );
  }
  modalDelete(user: UserModel) {
    /*------------------------------------------------------------------------*/
    /*  Se notifica que el usuario se ha borrado exitosamente.
    /*------------------------------------------------------------------------*/
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea borrar al usuario ${user.name}?`,
      type: 'question',
      showCancelButton: true
    }).then(action => {
      if (action.value) {
        this.delete(user._id);
      }
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BORRAR UN USUARIO
  /*==================================================================================*/
  delete(id: string) {
    if (this.id !== id) {
      this.userService.deleteUser(id).subscribe(
        (response: UserModel) => {
          if (this.page >= this.total - 1) {
            this.page -= 5;
          }
          this.loadData(this.page);
          /*------------------------------------------------------------------------*/
          /*  Se notifica que el usuario se ha borrado exitosamente.
          /*------------------------------------------------------------------------*/
          Swal.fire({
            title: '¡Usuario borrado!',
            text: `El usuario ${response.name} se ha borrado exitosamente.`,
            type: 'success'
          });
        },
        (error: any) => {
          /*--------------------------------------------------------------------------*/
          /*  Se notifica al usuario que ha ocurrido un error.
          /*--------------------------------------------------------------------------*/
          Swal.fire({
            title: '¡Algo ha ido mal!',
            text: 'Ha ocurrido un error al borrar el usuario.',
            type: 'error'
          });
        }
      );
    } else {
      /*--------------------------------------------------------------------------*/
      /*  Se notifica al usuario que ha ocurrido un error.
      /*--------------------------------------------------------------------------*/
      Swal.fire({
        title: '¡Un momento!',
        text: 'No se puede borrar a sí mismo.',
        type: 'warning'
      });
    }
  }
  open(user: UserModel) {
    const modal = this.modalService.open(ContentComponent);
    modal.componentInstance.title = `Imagen del usuario ${user.name}`;
    modal.componentInstance.collection = 'users';
    modal.componentInstance.model = user;
  }
}
