import { checkFilesExist, ensureNxProject, readJson, runNxCommandAsync, uniq } from '@nx/plugin/testing';

describe('nx-plugin-mrlonis e2e', () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(async () => {
    await runNxCommandAsync('reset');
  });

  beforeAll(() => {
    ensureNxProject('@mrlonis/nx-plugin-mrlonis', 'dist/libs/nx-plugin-mrlonis');
  });

  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runNxCommandAsync('reset');
  });

  it('should create nx-plugin-mrlonis', async () => {
    const project = uniq('nx-plugin-mrlonis');
    await runNxCommandAsync(`generate @mrlonis/nx-plugin-mrlonis:nx-plugin-mrlonis ${project}`);
    const result = await runNxCommandAsync(`build ${project}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(result.stdout).toContain('Executor ran');
  }, 500000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const project = uniq('nx-plugin-mrlonis');
      await runNxCommandAsync(`generate @mrlonis/nx-plugin-mrlonis:nx-plugin-mrlonis ${project} --directory subdir`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      expect(() => checkFilesExist(`libs/subdir/${project}/src/index.ts`)).not.toThrow();
    }, 500000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const projectName = uniq('nx-plugin-mrlonis');
      await runNxCommandAsync(
        `generate @mrlonis/nx-plugin-mrlonis:nx-plugin-mrlonis ${projectName} --tags e2etag,e2ePackage`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const project = readJson(`libs/${projectName}/project.json`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 500000);
  });
});
