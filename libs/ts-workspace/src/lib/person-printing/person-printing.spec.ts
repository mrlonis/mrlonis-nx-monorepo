import { peopleTs, printHierarchyTs } from './person-printing';
import { people, printHierarchyJs } from './person-printing-js';

const expectedResult = `-Jane
-Jack
--Kate
---Sayid
---Sun
--Aaron
---Hugo
--Sawyer
`;

describe('print person hierarchy', () => {
  it('should print person hierarchy - TypeScript', () => {
    const result = printHierarchyTs(peopleTs);
    expect(result).toEqual(expectedResult);
  });

  it('should print person hierarchy - JavaScript', () => {
    const result = printHierarchyJs(people);
    expect(result).toEqual(expectedResult);
  });
});
