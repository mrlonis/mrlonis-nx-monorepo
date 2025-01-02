/* eslint-disable import/no-deprecated */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { UserTableDataSource } from './user-table-data-source';
import { User } from './user.model';

@Component({
  selector: 'mrlonis-root',
  templateUrl: './table-mat-table/table-mat-table.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  visibleColumns = ['id', 'name', 'email'];
  dataSource: UserTableDataSource;
  ITEM_SIZE = 48;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewPort!: CdkVirtualScrollViewport;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  offset = 500;

  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.dataSource = new UserTableDataSource(this.ngZone);
  }

  ngOnInit() {
    console.log('ngOnInit(): Starting...');
    this._initSorting();
    console.log('ngOnInit(): this.viewPort = ', this.viewPort);
    console.log(`ngOnInit(): this.offset = ${this.offset}`);
    this.dataSource.attach(this.viewPort);

    this.viewPort.scrolledIndexChange
      .pipe(
        map(() => (this.viewPort.getOffsetToRenderedContentStart() ?? 500) * -1),
        distinctUntilChanged()
      )
      .subscribe((offset) => {
        this.offset = offset;
        console.log(`ngOnInit(): this.offset = ${this.offset}`);
      });

    this.viewPort.renderedRangeStream.subscribe((range) => {
      this.offset = range.start * -this.ITEM_SIZE;
      console.log(`ngOnInit(): this.offset = ${this.offset}`);
    });
    console.log('ngOnInit(): Finished!');
  }

  private _initSorting() {
    this.dataSource.matTableDataSource.sort = this.matSort;

    const originalSortingDataAccessor = this.dataSource.matTableDataSource.sortingDataAccessor;

    this.dataSource.matTableDataSource.sortingDataAccessor = (user: User, sortHeaderId: string) => {
      if (sortHeaderId === 'name') {
        return `${user.lastName}, ${user.firstName}`;
      }
      return originalSortingDataAccessor(user, sortHeaderId);
    };
  }
}
