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
import { PagesModule } from './pages/pages.module';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
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
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  /*----------------------------------------------------------------------------------*/
  /* Importaciones (modulos).
  /*----------------------------------------------------------------------------------*/
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PagesModule,
    AppRoutingModule
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
