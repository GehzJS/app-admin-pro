/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoPageComponent } from './no-page/no-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  /*----------------------------------------------------------------------------------*/
  /* Declaraciones (componentes).
  /*----------------------------------------------------------------------------------*/
  declarations: [
    BreadcrumsComponent,
    NavbarComponent,
    NoPageComponent,
    SidebarComponent
  ],
  /*----------------------------------------------------------------------------------*/
  /* Importaciones (modulos).
  /*----------------------------------------------------------------------------------*/
  imports: [CommonModule, RouterModule],
  /*----------------------------------------------------------------------------------*/
  /* Exportaciones (componentes).
  /*----------------------------------------------------------------------------------*/
  exports: [
    BreadcrumsComponent,
    NavbarComponent,
    NoPageComponent,
    SidebarComponent
  ]
})
export class SharedModule {}
