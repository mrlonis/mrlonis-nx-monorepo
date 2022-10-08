import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FixedRowSizeTableVirtualScrollStrategyDirective } from './directives/fixed-row-size-table-virtual-scroll-strategy.directive';
import { VirtualTableDirective } from './directives/virtual-table.directive';
import { MyTableComponent } from './my-table/my-table.component';
import { TableVirtualScrollViewportComponent } from './table-virtual-scroll-viewport/table-virtual-scroll-viewport.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatTableModule, NoopAnimationsModule, RouterTestingModule, ScrollingModule],
      declarations: [
        AppComponent,
        MyTableComponent,
        VirtualTableDirective,
        FixedRowSizeTableVirtualScrollStrategyDirective,
        TableVirtualScrollViewportComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'virtual-scroll-cdk-table-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('virtual-scroll-cdk-table-test');
  });
});
