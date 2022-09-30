import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, merge, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export class MrlonisTableVirtualScrollDataSource<T> extends MatTableDataSource<T> {
  public dataToRender$!: Subject<T[]>;
  public dataOfRange$!: Subject<T[]>;
  private streamsReady!: boolean;

  override _updateChangeSubscription() {
    this.initStreams();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const _sort: MatSort | null = this['_sort'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const _paginator: MatPaginator | null = this['_paginator'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const _internalPageChanges: Subject<void> = this['_internalPageChanges'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const _filter: BehaviorSubject<string> = this['_filter'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const _renderData: BehaviorSubject<T[]> = this['_renderData'];

    const sortChange: Observable<Sort | null | void> = _sort ? merge(_sort.sortChange, _sort.initialized) : of(null);
    const pageChange: Observable<PageEvent | null | void> = _paginator
      ? merge(_paginator.page, _internalPageChanges, _paginator.initialized)
      : of(null);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataStream: Observable<T[]> = this['_data'];
    const filteredData = combineLatest([dataStream, _filter]).pipe(map(([data]) => this._filterData(data)));
    const orderedData = combineLatest([filteredData, sortChange]).pipe(map(([data]) => this._orderData(data)));
    const paginatedData = combineLatest([orderedData, pageChange]).pipe(map(([data]) => this._pageData(data)));

    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = new Subscription();
    this._renderChangesSubscription.add(paginatedData.subscribe((data) => this.dataToRender$.next(data)));
    this._renderChangesSubscription.add(this.dataOfRange$.subscribe((data) => _renderData.next(data)));
  }

  private initStreams() {
    if (!this.streamsReady) {
      this.dataToRender$ = new ReplaySubject<T[]>(1);
      this.dataOfRange$ = new ReplaySubject<T[]>(1);
      this.streamsReady = true;
    }
  }
}
