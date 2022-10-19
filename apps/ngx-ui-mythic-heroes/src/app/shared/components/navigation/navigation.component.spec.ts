import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponentComponent } from './navigation.component';

describe('NavigationComponentComponent', () => {
  let component: NavigationComponentComponent;
  let fixture: ComponentFixture<NavigationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigationComponentComponent, NoopAnimationsModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(NavigationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
