import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatRadioModule, NgxChartsModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatRadioModule, NgxChartsModule, ReactiveFormsModule],
})
export class SharedModule {}
