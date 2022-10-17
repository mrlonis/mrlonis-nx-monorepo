export class Fibonacci {
  cache: { [key: number]: number } = {};

  constructor() {
    this.cache[0] = 0;
    this.cache[1] = 1;
  }

  getFibonacci(n: number): number {
    if (n < 0) {
      throw new Error('Invalid input. Number must be greater than or equal to 1');
    }

    if (this.cache[n] !== undefined) {
      return this.cache[n];
    }

    this.cache[n] = this.getFibonacci(n - 1) + this.getFibonacci(n - 2);
    return this.cache[n];
  }
}
