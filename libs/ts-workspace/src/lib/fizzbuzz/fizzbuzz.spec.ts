import { fizzbuzzTs } from './fizzbuzz';
import { fizzbuzzJs } from './fizzbuzz-js';

const expectedResult = `1
2
FIZZ
4
BUZZ
FIZZ
7
8
FIZZ
BUZZ
11
FIZZ
13
14
FIZZBUZZ
16
17
FIZZ
19
BUZZ
FIZZ
22
23
FIZZ
BUZZ
26
FIZZ
28
29
FIZZBUZZ
31
32
FIZZ
34
BUZZ
FIZZ
37
38
FIZZ
BUZZ
41
FIZZ
43
44
FIZZBUZZ
46
47
FIZZ
49
BUZZ
FIZZ
52
53
FIZZ
BUZZ
56
FIZZ
58
59
FIZZBUZZ
61
62
FIZZ
64
BUZZ
FIZZ
67
68
FIZZ
BUZZ
71
FIZZ
73
74
FIZZBUZZ
76
77
FIZZ
79
BUZZ
FIZZ
82
83
FIZZ
BUZZ
86
FIZZ
88
89
FIZZBUZZ
91
92
FIZZ
94
BUZZ
FIZZ
97
98
FIZZ
BUZZ
`;

describe('score bowling games', () => {
  it('should perform fizzbuzz - TypeScript', () => {
    const result = fizzbuzzTs();
    expect(result).toEqual(expectedResult);
  });

  it('should perform fizzbuzz - JavaScript', () => {
    const result = fizzbuzzJs();
    expect(result).toEqual(expectedResult);
  });
});
