import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared';
import { AnimeGridComponent } from './anime-grid.component';

describe('AnimeGridComponent', () => {
  let component: AnimeGridComponent;
  let fixture: ComponentFixture<AnimeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeGridComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
