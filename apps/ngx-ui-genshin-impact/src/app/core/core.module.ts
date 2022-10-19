import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, HomeModule],
  exports: [BrowserModule, HomeModule],
})
export class CoreModule {}
