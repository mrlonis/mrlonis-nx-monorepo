import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [MatToolbarModule, RouterModule],
  exports: [HomeComponent, MatToolbarModule, RouterModule]
})
export class HomeModule {}
