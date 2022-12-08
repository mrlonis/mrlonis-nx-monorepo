/* eslint-disable import/no-deprecated */
import { ListRange } from '@angular/cdk/collections';
import { TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NgxTableVirtualScrollDataSource } from './ngx-table-data-source';

interface TestData {
  index: number;
}

function getTestData(n = 10): TestData[] {
  return Array.from({ length: n }).map((e, i) => ({ index: i }));
}

// tslint:disable:no-string-literal
describe('NgxTableVirtualScrollDataSource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const dataSource: NgxTableVirtualScrollDataSource<TestData> = new NgxTableVirtualScrollDataSource<TestData>();
    expect(dataSource).toBeTruthy();

    const dataSource2: NgxTableVirtualScrollDataSource<TestData> = new NgxTableVirtualScrollDataSource<TestData>([
      { index: 0 }
    ]);
    expect(dataSource2).toBeTruthy();
  });

  it('should extend MatTableDataSource', () => {
    const dataSource: NgxTableVirtualScrollDataSource<TestData> = new NgxTableVirtualScrollDataSource<TestData>();
    expect(dataSource instanceof MatTableDataSource).toBeTruthy();
  });

  it('should have reaction on dataOfRange$ changes', () => {
    const testData: TestData[] = getTestData();
    const dataSource: NgxTableVirtualScrollDataSource<TestData> = new NgxTableVirtualScrollDataSource<TestData>(testData);
    const stream = new Subject<TestData[]>();

    stream.subscribe(dataSource.dataOfRange$);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const renderData: Subject<TestData[]> = dataSource['_renderData'];

    let count = -1; // renderData is BehaviorSubject with base value '[]'
    renderData.subscribe(() => {
      count++;
    });

    stream.next(testData.slice(0, 1));
    stream.next(testData);

    expect(count).toBe(2);
  });

  it('should provide correct data', () => {
    const testData: TestData[] = getTestData(10);
    const dataSource: NgxTableVirtualScrollDataSource<TestData> = new NgxTableVirtualScrollDataSource<TestData>(testData);
    const stream = new Subject<ListRange>();

    dataSource.dataToRender$
      .pipe(switchMap((data) => stream.pipe(map(({ start, end }) => data.slice(start, end)))))
      .subscribe(dataSource.dataOfRange$);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const renderData: Subject<TestData[]> = dataSource['_renderData'];

    const results: TestData[][] = [];

    renderData.subscribe((data) => {
      results.push(data);
    });

    stream.next({ start: 0, end: 2 });
    stream.next({ start: 8, end: testData.length });

    expect(results).toEqual([[], [{ index: 0 }, { index: 1 }], [{ index: 8 }, { index: 9 }]]);
  });
});
