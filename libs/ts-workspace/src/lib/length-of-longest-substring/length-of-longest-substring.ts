export function lengthOfLongestSubstring(s: string): number {
  // if string length is 0
  if (s.length === 0) return 0;

  // if string length 1
  if (s.length === 1) return 1;

  // if string length is more than 2
  let maxLength = 0;
  const visited: boolean[] = new Array<boolean>(256).fill(false);

  // left and right pointer of sliding window
  let left = 0;
  let right = 0;
  while (right < s.length) {
    // if character is visited
    if (visited[s.charCodeAt(right)]) {
      // The left pointer moves to the right while
      // marking visited characters as false until the
      // repeating character is no longer part of the
      // current window.
      while (visited[s.charCodeAt(right)]) {
        visited[s.charCodeAt(left)] = false;
        left++;
      }
    }

    visited[s.charCodeAt(right)] = true;

    // The length of the current window (right - left + 1)
    // is calculated and the answer is updated accordingly.
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }

  return maxLength;
}
