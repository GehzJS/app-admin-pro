/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/*====================================================================================*/
/*  IMPORTACIONES DE MODULOS
/*====================================================================================*/
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
/*====================================================================================*/
/*  IMPORTACIONES DE INTERCEPTORES
/*====================================================================================*/
import { AuthHttpInterceptor } from './interceptors/auth.interceptor';
/*====================================================================================*/
/*  CONFIGURACIONES DEL MODULO
/*====================================================================================*/
@NgModule({
  /*----------------------------------------------------------------------------------*/
  /* Declaraciones (componentes).
  /*----------------------------------------------------------------------------------*/
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  /*----------------------------------------------------------------------------------*/
  /* Importaciones (modulos).
  /*----------------------------------------------------------------------------------*/
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  /*----------------------------------------------------------------------------------*/
  /* Proveedores (servicios).
  /*----------------------------------------------------------------------------------*/
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  /*----------------------------------------------------------------------------------*/
  /* Inicio de la aplicación.
  /*----------------------------------------------------------------------------------*/
  bootstrap: [AppComponent]
})
export class AppModule {}
