/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*====================================================================================*/
/*  IMPORTACIONES DE MODULOS
/*====================================================================================*/
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartComponent } from '../components/chart/chart.component';
import { SettingsComponent } from '../components/settings/settings.component';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBRERÍAS DE TERCEROS
/*====================================================================================*/
import { ChartsModule } from 'ng2-charts';
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  /*----------------------------------------------------------------------------------*/
  /* Declaraciones (componentes).
  /*----------------------------------------------------------------------------------*/
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraphicsComponent,
    ProgressComponent,
    ChartComponent,
    SettingsComponent
  ],
  /*----------------------------------------------------------------------------------*/
  /* Importaciones (modulos).
  /*----------------------------------------------------------------------------------*/
  imports: [CommonModule, PagesRoutingModule, SharedModule, ChartsModule],
  /*----------------------------------------------------------------------------------*/
  /* Exportaciones (componentes).
  /*----------------------------------------------------------------------------------*/
  exports: [
    PagesComponent,
    DashboardComponent,
    GraphicsComponent,
    ProgressComponent
  ]
})
export class PagesModule {}
