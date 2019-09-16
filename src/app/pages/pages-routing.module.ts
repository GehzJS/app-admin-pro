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
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';
/*====================================================================================*/
/*  IMPORTACIONES DE GUARDS
/*====================================================================================*/
import { AdminGuard } from 'src/app/guards/admin.guard';
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
      /*  Ruta del perfil de usuario.
      /*------------------------------------------------------------------------------*/
      {
        path: 'search/:keyword',
        component: SearchComponent,
        data: { title: 'Buscador' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta de los usuarios.
      /*------------------------------------------------------------------------------*/
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard],
        data: { title: 'Usuarios' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta de los hospitales.
      /*------------------------------------------------------------------------------*/
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Hospitales' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta de los doctores.
      /*------------------------------------------------------------------------------*/
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Doctores' }
      },
      /*------------------------------------------------------------------------------*/
      /*  Ruta del doctor.
      /*------------------------------------------------------------------------------*/
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { title: 'Doctor' }
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
