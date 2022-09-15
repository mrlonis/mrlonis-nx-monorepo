import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroDetailGuard } from './hero-detail.guard';

describe('HeroDetailGuard', () => {
  let guard: HeroDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(HeroDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
