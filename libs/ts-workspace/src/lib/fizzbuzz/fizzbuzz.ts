export function fizzbuzzTs(): string {
  let returnValue = '';

  let i = 1;
  while (i <= 100) {
    const multipleOf3 = i % 3 === 0;
    const multipleOf5 = i % 5 === 0;
    if (multipleOf3 && multipleOf5) {
      console.log('FizzBuzz');
      returnValue = returnValue.concat('FizzBuzz\n');
    } else if (multipleOf5) {
      console.log('Buzz');
      returnValue = returnValue.concat('Buzz\n');
    } else if (multipleOf3) {
      console.log('Fizz');
      returnValue = returnValue.concat('Fizz\n');
    } else {
      console.log(i);
      returnValue = returnValue.concat(`${i}\n`);
    }
    i++;
  }
  return returnValue;
}
