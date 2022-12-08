import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared';
import { FunctionTestingComponent } from './function-testing.component';

describe('FunctionTestingComponent', () => {
  let component: FunctionTestingComponent;
  let fixture: ComponentFixture<FunctionTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionTestingComponent],
      imports: [NoopAnimationsModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FunctionTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
