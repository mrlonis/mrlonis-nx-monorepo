import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimeGridComponent } from './anime-grid.component';

describe('AnimeGridComponent', () => {
  let component: AnimeGridComponent;
  let fixture: ComponentFixture<AnimeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
