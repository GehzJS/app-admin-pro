/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { NgModule } from '@angular/core';
/*====================================================================================*/
/*  IMPORTACIONES DE PIPES
/*====================================================================================*/
import { ImagePipe } from './image.pipe';
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  /*----------------------------------------------------------------------------------*/
  /* Declaraciones (componentes).
  /*----------------------------------------------------------------------------------*/
  declarations: [ImagePipe],
  /*----------------------------------------------------------------------------------*/
  /* Importaciones (modulos).
  /*----------------------------------------------------------------------------------*/
  imports: [],
  /*----------------------------------------------------------------------------------*/
  /* Exportaciones (componentes).
  /*----------------------------------------------------------------------------------*/
  exports: [ImagePipe]
})
export class PipesModule {}