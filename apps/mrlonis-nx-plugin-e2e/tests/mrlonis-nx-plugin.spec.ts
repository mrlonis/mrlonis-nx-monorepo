import { checkFilesExist, ensureNxProject, readJson, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing';

describe('mrlonis-nx-plugin e2e', () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(() => {
    ensureNxProject('@mrlonis/mrlonis-nx-plugin', 'dist/libs/mrlonis-nx-plugin');
  });

  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runNxCommandAsync('reset');
  });

  it('should create mrlonis-nx-plugin', async () => {
    const project = uniq('mrlonis-nx-plugin');
    await runNxCommandAsync(`generate @mrlonis/mrlonis-nx-plugin:mrlonis-nx-plugin ${project}`);
    const result = await runNxCommandAsync(`build ${project}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const project = uniq('mrlonis-nx-plugin');
      await runNxCommandAsync(`generate @mrlonis/mrlonis-nx-plugin:mrlonis-nx-plugin ${project} --directory subdir`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      expect(() => checkFilesExist(`libs/subdir/${project}/src/index.ts`)).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const projectName = uniq('mrlonis-nx-plugin');
      ensureNxProject('@mrlonis/mrlonis-nx-plugin', 'dist/libs/mrlonis-nx-plugin');
      await runNxCommandAsync(
        `generate @mrlonis/mrlonis-nx-plugin:mrlonis-nx-plugin ${projectName} --tags e2etag,e2ePackage`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const project = readJson(`libs/${projectName}/project.json`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
