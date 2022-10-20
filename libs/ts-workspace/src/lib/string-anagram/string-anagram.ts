export function stringAnagram(input1: string, input2: string): boolean {
  if (input1.length !== input2.length) {
    return false;
  }

  // Process input
  const input1Metadata: { [index: string]: number } = {};
  const input2Metadata: { [index: string]: number } = {};

  for (let i = 0; i < input1.length; i++) {
    const letter1 = input1[i];
    const letter2 = input2[i];

    const existingValue1 = input1Metadata[letter1];
    if (existingValue1 === undefined) {
      input1Metadata[letter1] = 1;
    } else {
      input1Metadata[letter1] += 1;
    }

    const existingValue2 = input2Metadata[letter2];
    if (existingValue2 === undefined) {
      input2Metadata[letter2] = 1;
    } else {
      input2Metadata[letter2] += 1;
    }
  }

  const keys = Object.keys(input1Metadata);
  const keys2 = Object.keys(input2Metadata);

  if (keys.length !== keys2.length) {
    return false;
  }

  for (let i = 0; i < keys.length; i++) {
    const letterCount1 = input1Metadata[keys[i]];
    const letterCount2 = input2Metadata[keys[i]];

    if (letterCount1 !== letterCount2) {
      return false;
    }
  }

  return true;
}
