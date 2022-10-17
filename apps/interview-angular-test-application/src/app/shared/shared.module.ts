import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, NgxChartsModule],
  exports: [CommonModule, MatButtonModule, MatIconModule, NgxChartsModule],
})
export class SharedModule {}
