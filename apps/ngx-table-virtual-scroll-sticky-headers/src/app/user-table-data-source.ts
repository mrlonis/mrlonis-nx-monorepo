/* eslint-disable import/no-deprecated */
import { ListRange } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/table';
import { Injectable, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, combineLatest, from, Observable, of, Subscription } from 'rxjs';
import { delay, exhaustMap, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class UserTableDataSource extends DataSource<User> {
  private _pageSize = 100; // elements
  private _pages = 10; // pages
  private _pageOffset = 100; // elements
  private _pageCache = new Set<number>();
  private _subscription!: Subscription;
  private _viewPort!: CdkVirtualScrollViewport;

  // Create MatTableDataSource so we can have all sort,filter bells and whistles
  matTableDataSource = new MatTableDataSource<User>();

  // Expose dataStream to simulate VirtualForOf.dataStream
  dataStream = this.matTableDataSource.connect().asObservable();

  renderedStream = new BehaviorSubject<User[]>([]);

  constructor(private ngZone: NgZone) {
    console.log('UserTableDataSource: constructor(): Starting...');
    super();
    faker.seed(1234);
    console.log('UserTableDataSource: constructor(): Finished!');
  }

  attach(viewPort: CdkVirtualScrollViewport) {
    console.log('UserTableDataSource: attach(): Starting...');
    if (!viewPort) {
      throw new Error('ViewPort is undefined');
    }
    this._viewPort = viewPort;

    this.initFetchingOnScrollUpdates();

    // Attach DataSource as CdkVirtualForOf so ViewPort can access dataStream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    this._viewPort.attach(this as any);

    // Trigger range change so that 1st page can be loaded
    this._viewPort.setRenderedRange({ start: 0, end: 10 });
    console.log('UserTableDataSource: attach(): Finished!');
  }

  // Called by CDK Table
  connect(): Observable<User[]> {
    console.log('UserTableDataSource: connect(): Starting...');
    const tableData = this.matTableDataSource.connect();
    const filtered = this._viewPort === undefined ? tableData : this.filterByRangeStream(tableData);

    filtered.subscribe((data) => {
      this.renderedStream.next(data);
    });

    console.log('UserTableDataSource: connect(): Finished!');
    return this.renderedStream.asObservable();
  }

  disconnect(): void {
    console.log('UserTableDataSource: disconnect(): Starting...');
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    console.log('UserTableDataSource: disconnect(): Finished!');
  }

  private initFetchingOnScrollUpdates() {
    console.log('UserTableDataSource: initFetchingOnScrollUpdates(): Starting...');
    this._subscription = this._viewPort.renderedRangeStream
      .pipe(
        switchMap((range) => this._getPagesToDownload(range)),
        filter((page) => !this._pageCache.has(page)),
        exhaustMap((page) => this._simulateFetchAndUpdate(page))
      )
      .subscribe();
    console.log('UserTableDataSource: initFetchingOnScrollUpdates(): Finished!');
  }

  private _getPagesToDownload({ start, end }: { start: number; end: number }) {
    console.log('UserTableDataSource: _getPagesToDownload(): Starting...');
    const startPage = this._getPageForIndex(start);
    const endPage = this._getPageForIndex(end + this._pageOffset);
    const pages: number[] = [];
    for (let i = startPage; i <= endPage && i < this._pages; i++) {
      if (!this._pageCache.has(i)) {
        pages.push(i);
      }
    }
    console.log('UserTableDataSource: _getPagesToDownload(): Finished!');
    return from(pages);
  }

  private _getPageForIndex(index: number): number {
    console.log('UserTableDataSource: _getPageForIndex(): Starting...');
    return Math.floor(index / this._pageSize);
  }

  private filterByRangeStream(tableData: Observable<User[]>) {
    console.log('UserTableDataSource: filterByRangeStream(): Starting...');
    const rangeStream = this._viewPort.renderedRangeStream.pipe(startWith({} as ListRange));
    const filtered = combineLatest([tableData, rangeStream]).pipe(
      map(([data, { start, end }]) => {
        return start === null || end === null ? data : data.slice(start, end);
      })
    );
    console.log('UserTableDataSource: filterByRangeStream(): Finished!');
    return filtered;
  }

  private _simulateFetchAndUpdate(page: number): Observable<User[]> {
    console.log('UserTableDataSource: _simulateFetchAndUpdate(): Starting...');
    return of(page).pipe(
      filter((page) => !this._pageCache.has(page)),
      map((page) =>
        Array.from(Array(this._pageSize).keys()).map((v, i) => {
          const id = page * this._pageSize + i;
          const firstName = faker.person.firstName();
          const lastName = faker.person.lastName();
          const email = faker.internet.email({ firstName: firstName, lastName: lastName });
          return { id, firstName, lastName, email } as User;
        })
      ),
      delay(1000),
      tap(() => this._pageCache.add(page)),
      tap((users) => {
        const newData = [...this.matTableDataSource.data];
        newData.splice(page * this._pageSize, this._pageSize, ...users);
        this.matTableDataSource.data = newData;
      })
    );
  }
}
