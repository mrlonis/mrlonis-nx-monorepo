import { Component } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

const DATA = Array.from({ length: 1000 }, (v, i) => ({
  id: i + 1,
  name: `Element #${i + 1}`,
}));

@Component({
  selector: 'mrlonis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns = ['id', 'name'];

  dataSource = new TableVirtualScrollDataSource(DATA);
}
