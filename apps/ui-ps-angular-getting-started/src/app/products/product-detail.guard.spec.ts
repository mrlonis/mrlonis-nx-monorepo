import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';

describe('ProductDetailGuard', () => {
  let guard: ProductDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
    });
    guard = TestBed.inject(ProductDetailGuard);
  });

  it('ProductDetailGuard should be created', () => {
    expect(guard).toBeTruthy();
  });
});
