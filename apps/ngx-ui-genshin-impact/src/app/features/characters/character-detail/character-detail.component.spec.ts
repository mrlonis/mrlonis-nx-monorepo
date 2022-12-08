import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiConfigProvider, API_CONFIG_TOKEN } from '@mrlonis/ngx-mrlonis-shared';
import { CharacterDetailComponent } from './character-detail.component';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [HttpClientTestingModule, MatCardModule, RouterModule.forRoot([]), RouterTestingModule],
      providers: [
        {
          provide: API_CONFIG_TOKEN,
          useValue: {
            apiUrl: 'http://fake-url.com'
          } as ApiConfigProvider
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
