import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LineChartComponent } from './features/line-chart/line-chart.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PieChartComponent } from './features/pie-chart/pie-chart.component';
import { BarChartComponent } from './features/bar-chart/bar-chart.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, LineChartComponent, PieChartComponent, BarChartComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    NgxChartsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
