/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*====================================================================================*/
/*  IMPORTACIONES DE MODULOS
/*====================================================================================*/
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ProgressComponent } from './progress/progress.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
/*====================================================================================*/
/*  IMPORTACIONES DE PIPES
/*====================================================================================*/
import { PipesModule } from 'src/app/pipes/pipes.module';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBRERÍAS DE TERCEROS
/*====================================================================================*/
import { ChartsModule } from 'ng2-charts';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentComponent } from '../components/content/content.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  /*----------------------------------------------------------------------------------*/
  /* Declaraciones (componentes).
  /*----------------------------------------------------------------------------------*/
  declarations: [
    DashboardComponent,
    GraphicsComponent,
    ProgressComponent,
    ChartComponent,
    SettingsComponent,
    ProfileComponent,
    UsersComponent,
    ContentComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent
  ],
  /*----------------------------------------------------------------------------------*/
  /* Importaciones (modulos).
  /*----------------------------------------------------------------------------------*/
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ChartsModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  /*----------------------------------------------------------------------------------*/
  /* Exportaciones (componentes).
  /*----------------------------------------------------------------------------------*/
  exports: [DashboardComponent, GraphicsComponent, ProgressComponent],
  providers: [NgbActiveModal],
  entryComponents: [ContentComponent]
})
export class PagesModule {}
