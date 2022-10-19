import { Fibonacci } from './fibonacci';

describe('typescriptWorkspace', () => {
  let fibonacci: Fibonacci;

  beforeEach(() => {
    fibonacci = new Fibonacci();
  });

  it('should work', () => {
    expect(fibonacci.getFibonacci(0)).toEqual(0);
  });
});
