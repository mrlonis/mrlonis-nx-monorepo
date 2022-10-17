import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, NgxChartsModule],
  exports: [CommonModule, MatButtonModule, MatIconModule, NgxChartsModule],
})
export class SharedModule {}
