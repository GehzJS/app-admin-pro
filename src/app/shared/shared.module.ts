import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoPageComponent } from './no-page/no-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    BreadcrumsComponent,
    NavbarComponent,
    NoPageComponent,
    SidebarComponent
  ],
  imports: [CommonModule],
  exports: [
    BreadcrumsComponent,
    NavbarComponent,
    NoPageComponent,
    SidebarComponent
  ]
})
export class SharedModule {}
