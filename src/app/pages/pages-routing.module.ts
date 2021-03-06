/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
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
import { VerifyTokenGuard } from 'src/app/guards/verify-token.guard';
/*====================================================================================*/
/*  DEFINICIÓN DE RUTAS
/*====================================================================================*/
const pagesRoutes: Routes = [
  /*------------------------------------------------------------------------------*/
  /*  Ruta del dashboard.
      /*------------------------------------------------------------------------------*/
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Dashboard' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta las barras de progreso.
      /*------------------------------------------------------------------------------*/
  {
    path: 'progress',
    component: ProgressComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Progreso' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta de las gráficas.
      /*------------------------------------------------------------------------------*/
  {
    path: 'graphics',
    component: GraphicsComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Graficas' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta de las configuraciones.
      /*------------------------------------------------------------------------------*/
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Ajustes' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta del perfil de usuario.
      /*------------------------------------------------------------------------------*/
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Perfil' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta del perfil de usuario.
      /*------------------------------------------------------------------------------*/
  {
    path: 'search/:keyword',
    component: SearchComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Buscador' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta de los usuarios.
      /*------------------------------------------------------------------------------*/
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard, VerifyTokenGuard],
    data: { title: 'Usuarios' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta de los hospitales.
      /*------------------------------------------------------------------------------*/
  {
    path: 'hospitals',
    component: HospitalsComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Hospitales' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta de los doctores.
      /*------------------------------------------------------------------------------*/
  {
    path: 'doctors',
    component: DoctorsComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Doctores' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta del doctor.
      /*------------------------------------------------------------------------------*/
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    canActivate: [VerifyTokenGuard],
    data: { title: 'Doctor' }
  },
  /*------------------------------------------------------------------------------*/
  /*  Ruta por defecto.
      /*------------------------------------------------------------------------------*/
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
