/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class NavbarComponent implements OnInit {
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
  constructor(private router: Router, private userService: UserService) {
    this.user = this.userService.user;
    this.userService.userChanges.subscribe((response: UserModel) => {
      this.user = response;
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {}

  search(keyword: string) {
    this.router.navigate(['/search', keyword]);
  }
}
