import { buildableTypescriptLibrary } from './buildable-typescript-library';

describe('buildableTypescriptLibrary', () => {
  it('should work', () => {
    expect(buildableTypescriptLibrary()).toEqual('buildable-typescript-library');
  });
});
