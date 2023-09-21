export function fizzbuzzTs(): string {
  let returnValue = '';

  let i = 1;
  while (i <= 100) {
    const multipleOf3 = i % 3 === 0;
    const multipleOf5 = i % 5 === 0;
    if (multipleOf3 && multipleOf5) {
      returnValue = returnValue.concat('FIZZBUZZ\n');
    } else if (multipleOf5) {
      returnValue = returnValue.concat('BUZZ\n');
    } else if (multipleOf3) {
      returnValue = returnValue.concat('FIZZ\n');
    } else {
      returnValue = returnValue.concat(`${i}\n`);
    }
    i++;
  }
  return returnValue;
}
