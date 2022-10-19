import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunctionTestingComponent } from './function-testing.component';

describe('FunctionTestingComponent', () => {
  let component: FunctionTestingComponent;
  let fixture: ComponentFixture<FunctionTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionTestingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FunctionTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
