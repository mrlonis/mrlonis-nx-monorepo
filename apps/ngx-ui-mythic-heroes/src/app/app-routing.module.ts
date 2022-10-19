import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent, HeroDetailGuard, HeroListComponent, WelcomeComponent } from './features';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'heroes', component: HeroListComponent },
  {
    path: 'heroes/:id',
    canActivate: [HeroDetailGuard],
    component: HeroDetailComponent,
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
