/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserModel } from 'src/app/models/user.model';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class SidebarComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Datos del usuario.
  /*----------------------------------------------------------------------------------*/
  user: UserModel;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(
    public sidebarService: SidebarService,
    public userService: UserService
  ) {
    this.user = this.userService.user;
    this.userService.userChanges.subscribe((response: UserModel) => {
      this.user = response;
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {
    this.sidebarService.loadMenu();
  }
}
