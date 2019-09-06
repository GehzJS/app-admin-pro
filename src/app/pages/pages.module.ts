import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartComponent } from '../components/chart/chart.component';
import { SettingsComponent } from '../components/settings/settings.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraphicsComponent,
    ProgressComponent,
    ChartComponent,
    SettingsComponent
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule, ChartsModule],
  exports: [
    PagesComponent,
    DashboardComponent,
    GraphicsComponent,
    ProgressComponent
  ]
})
export class PagesModule {}
