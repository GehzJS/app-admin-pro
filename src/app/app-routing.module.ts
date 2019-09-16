/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NoPageComponent } from './shared/no-page/no-page.component';
import { PagesComponent } from './pages/pages.component';
/*====================================================================================*/
/*  IMPORTACIONES DE GUARDS
/*====================================================================================*/
import { LoginGuard } from 'src/app/guards/login.guard';
/*====================================================================================*/
/*  DEFINICIÓN DE RUTAS
/*====================================================================================*/
const routes: Routes = [
  /*----------------------------------------------------------------------------------*/
  /*  Ruta del login.
  /*----------------------------------------------------------------------------------*/
  { path: 'login', component: LoginComponent },
  /*----------------------------------------------------------------------------------*/
  /*  Ruta del registro.
  /*----------------------------------------------------------------------------------*/
  { path: 'register', component: RegisterComponent },
  /*----------------------------------------------------------------------------------*/
  /*  Ruta de las páginas.
  /*----------------------------------------------------------------------------------*/
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    loadChildren: './pages/pages.module#PagesModule' // Lazy load.
  },
  /*----------------------------------------------------------------------------------*/
  /*  Ruta por defecto.
  /*----------------------------------------------------------------------------------*/
  { path: '**', component: NoPageComponent }
];
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
