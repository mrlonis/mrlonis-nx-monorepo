import { lengthOfLongestSubstring } from './length-of-longest-substring';

describe('lengthOfLongestSubstring', () => {
  it('should get length of longest substring', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toEqual(3);
    expect(lengthOfLongestSubstring('bbbbb')).toEqual(1);
    expect(lengthOfLongestSubstring('pwwkew')).toEqual(3);
    expect(lengthOfLongestSubstring(' ')).toEqual(1);
    expect(lengthOfLongestSubstring('dvdf')).toEqual(3);
  });
});
