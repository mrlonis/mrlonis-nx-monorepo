import { getJestProjectsAsync } from '@nx/jest';
import type { JestConfigWithTsJest } from 'ts-jest';

export default async () =>
  ({
    projects: await getJestProjectsAsync()
  }) satisfies JestConfigWithTsJest;
