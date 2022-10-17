import { interviewTypescriptWorkspace } from './interview-typescript-workspace';

describe('interviewTypescriptWorkspace', () => {
  it('should work', () => {
    const result: string = interviewTypescriptWorkspace();
    const expected = 'interview-typescript-workspace';

    expect(result).toEqual(expected);
  });
});
