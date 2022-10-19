import { typescriptBuildableLibrary } from './ts-buildable-library';

describe('buildableTypescriptLibrary', () => {
  it('should work', () => {
    expect(typescriptBuildableLibrary()).toEqual('ts-buildable-library');
  });
});
