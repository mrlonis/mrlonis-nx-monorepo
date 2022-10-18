import { Route } from '@angular/router';
import { AnimeGridComponent, BarChartComponent, LineChartComponent, PieChartComponent } from './features';

export const appRoutes: Route[] = [
  { path: 'barChart', component: BarChartComponent },
  { path: 'lineChart', component: LineChartComponent },
  { path: 'pieChart', component: PieChartComponent },
  { path: 'animeGrid', component: AnimeGridComponent },
  { path: '', redirectTo: 'lineChart', pathMatch: 'full' },
  { path: '**', redirectTo: 'lineChart', pathMatch: 'full' },
];
