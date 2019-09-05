import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraphicsComponent,
    ProgressComponent
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  exports: [
    PagesComponent,
    DashboardComponent,
    GraphicsComponent,
    ProgressComponent
  ]
})
export class PagesModule {}
