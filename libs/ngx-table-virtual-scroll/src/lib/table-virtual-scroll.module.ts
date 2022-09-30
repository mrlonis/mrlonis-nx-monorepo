import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableItemSizeDirective } from './table-item-size.directive';

@NgModule({
  declarations: [TableItemSizeDirective],
  imports: [MatTableModule, ScrollingModule],
  exports: [MatTableModule, ScrollingModule, TableItemSizeDirective],
})
export class MrlonisTableVirtualScrollModule {}
