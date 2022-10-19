import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettingsFormComponent } from './user-settings-form.component';

describe('UserSettingsFormComponent', () => {
  let component: UserSettingsFormComponent;
  let fixture: ComponentFixture<UserSettingsFormComponent>;

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
      declarations: [UserSettingsFormComponent],
      imports: [CommonModule, FormsModule, NgbModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
