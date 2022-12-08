import { Component, Input } from '@angular/core';
import { Todo } from '@mrlonis/nx-angular-tutorial-data';

@Component({
  selector: 'mrlonis-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  @Input() todos: Todo[] = [];
}
