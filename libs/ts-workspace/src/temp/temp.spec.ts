import { tempFunction } from './temp';

describe('test temp', () => {
  it('should test temp', () => {
    const result: string = tempFunction();
    expect(result).toEqual('Hello World');
  });
});
