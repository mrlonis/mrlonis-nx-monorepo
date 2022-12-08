import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TodosComponent],
  exports: [TodosComponent]
})
export class NxAngularTutorialUiModule {}
