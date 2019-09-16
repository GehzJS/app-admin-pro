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
import { UploadComponent } from 'src/app/components/upload/upload.component';
/*====================================================================================*/
/*  IMPORTACIONES DE PIPES
/*====================================================================================*/
import { PipesModule } from 'src/app/pipes/pipes.module';
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
    SidebarComponent,
    UploadComponent
  ],
  /*----------------------------------------------------------------------------------*/
  /* Importaciones (modulos).
  /*----------------------------------------------------------------------------------*/
  imports: [CommonModule, RouterModule, PipesModule],
  /*----------------------------------------------------------------------------------*/
  /* Exportaciones (componentes).
  /*----------------------------------------------------------------------------------*/
  exports: [
    BreadcrumsComponent,
    NavbarComponent,
    NoPageComponent,
    SidebarComponent,
    UploadComponent
  ]
})
export class SharedModule {}
