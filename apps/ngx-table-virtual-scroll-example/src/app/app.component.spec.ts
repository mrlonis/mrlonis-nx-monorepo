import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { NgxTableVirtualScrollModule } from '@mrlonis/ngx-table-virtual-scroll';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        NgxTableVirtualScrollModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        ScrollingModule,
        TableVirtualScrollModule
      ],
      declarations: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have 2 displayedColumns`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.displayedColumns.length).toEqual(2);
  });
});
