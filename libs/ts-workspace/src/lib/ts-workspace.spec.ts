import { typescriptWorkspace } from './ts-workspace';

describe('typescriptWorkspace', () => {
  it('should work', () => {
    const result: string = typescriptWorkspace();
    const expected = 'ts-workspace';

    expect(result).toEqual(expected);
  });
});
