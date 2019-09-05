import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NoPageComponent } from './shared/no-page/no-page.component';
import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoPageComponent,
    DashboardComponent,
    GraphicsComponent,
    NavbarComponent,
    SidebarComponent,
    BreadcrumsComponent,
    ProgressComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
