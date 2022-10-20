import { stringAnagram } from './string-anagram';

describe('', () => {
  it('should work', () => {
    const input1 = 'heart';
    const input2 = 'earth';
    const result: boolean = stringAnagram(input1, input2);
    const expected = true;

    expect(result).toEqual(expected);
  });

  it('should work for another one', () => {
    const input1 = 'hello';
    const input2 = 'loleh';
    const result: boolean = stringAnagram(input1, input2);
    const expected = true;

    expect(result).toEqual(expected);
  });

  it('should work for another one', () => {
    const input1 = 'ee';
    const input2 = 'eee';
    const result: boolean = stringAnagram(input1, input2);
    const expected = false;

    expect(result).toEqual(expected);
  });
});
