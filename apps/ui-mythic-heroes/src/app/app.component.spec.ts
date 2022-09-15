import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiConfigProvider, API_CONFIG_TOKEN, NavigationComponentComponent } from './shared';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HttpClientTestingModule,
        NavigationComponentComponent,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: API_CONFIG_TOKEN,
          useValue: {
            apiUrl: 'http://localhost:9001/api',
          } as ApiConfigProvider,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'demo-mythic-heroes-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.pageTitle).toEqual('demo-mythic-heroes-angular');
  });
});
