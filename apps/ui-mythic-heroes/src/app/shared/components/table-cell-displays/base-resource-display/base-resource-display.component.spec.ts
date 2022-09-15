import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiConfigProvider, API_CONFIG_TOKEN } from '../../../services';
import { BaseResourceDisplayComponent } from './base-resource-display.component';

describe('BaseResourceDisplayComponent', () => {
  let component: BaseResourceDisplayComponent;
  let fixture: ComponentFixture<BaseResourceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseResourceDisplayComponent, HttpClientTestingModule, RouterTestingModule],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseResourceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
