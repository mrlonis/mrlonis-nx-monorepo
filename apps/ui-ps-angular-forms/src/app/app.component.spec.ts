import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { DataService } from './data/data.service';
import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService,
          useValue: {
            getSubscriptionTypes(): Observable<string[]> {
              return of(['Monthly', 'Annual', 'Lifetime']);
            },
          },
        },
      ],
      declarations: [AppComponent, UserSettingsFormComponent],
      imports: [CommonModule, FormsModule, NgbModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ps-angular-forms'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ps-angular-forms');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   const compiled = fixture.nativeElement;
  //   console.log(compiled);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //   expect(compiled.querySelector('.content span').textContent).toContain('ps-angular-forms app is running!');
  // });
});
