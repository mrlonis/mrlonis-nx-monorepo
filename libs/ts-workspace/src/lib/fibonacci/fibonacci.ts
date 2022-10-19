export class Fibonacci {
  cache: { [key: number]: number } = {};
  useCache: boolean;

  constructor(useCache = true) {
    this.useCache = useCache;
    this.cache[0] = 0;
    this.cache[1] = 1;
  }

  getFibonacci(n: number): number {
    if (n < 0) {
      throw new Error('Invalid input. Number must be greater than or equal to 1');
    }

    if (this.useCache) {
      if (this.cache[n] !== undefined) {
        return this.cache[n];
      }
    } else {
      if (n === 0) {
        return 0;
      }

      if (n === 1) {
        return 1;
      }
    }

    this.cache[n] = this.getFibonacci(n - 1) + this.getFibonacci(n - 2);
    return this.cache[n];
  }
}
