import { BuildExecutorSchema } from './schema';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function runExecutor(options: BuildExecutorSchema) {
  console.log('Executor ran for Build', options);
  return {
    success: true
  };
}
