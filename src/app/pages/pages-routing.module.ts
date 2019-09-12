/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*====================================================================================*/
/*  IMPORTACIONES DE GUARDS
/*====================================================================================*/
import { LoginGuard } from 'src/app/guards/login.guard';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
/*====================================================================================*/
/*  DEFINICIÓN DE RUTAS
/*====================================================================================*/
const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      /*------------------------------------------------------------------------------*/
      /*  Ruta del dashboard.
      /*------------------------------------------------------------------------------*/
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta las barras de progreso.
      /*------------------------------------------------------------------------------*/
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progreso' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta de las gráficas.
      /*------------------------------------------------------------------------------*/
      {
        path: 'graphics',
        component: GraphicsComponent,
        data: { title: 'Graficas' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta de las configuraciones.
      /*------------------------------------------------------------------------------*/
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Ajustes' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta del perfil de usuario.
      /*------------------------------------------------------------------------------*/
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Perfil' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta por defecto.
      /*------------------------------------------------------------------------------*/
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  }
];
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
