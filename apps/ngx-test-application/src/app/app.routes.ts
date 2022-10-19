import { Route } from '@angular/router';
import {
  AnimeGridComponent,
  BarChartComponent,
  FunctionTestingComponent,
  LineChartComponent,
  PieChartComponent,
} from './features';

export const appRoutes: Route[] = [
  { path: 'animeGrid', component: AnimeGridComponent },
  { path: 'barChart', component: BarChartComponent },
  { path: 'lineChart', component: LineChartComponent },
  { path: 'functionTesting', component: FunctionTestingComponent },
  { path: 'pieChart', component: PieChartComponent },
  { path: '', redirectTo: 'animeGrid', pathMatch: 'full' },
  { path: '**', redirectTo: 'animeGrid', pathMatch: 'full' },
];
