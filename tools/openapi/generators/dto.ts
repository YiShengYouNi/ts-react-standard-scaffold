import fs from 'fs/promises';

import { execa } from 'execa';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function generateDTO(inputSpecFile: string, outDir: string) {
  await fs.mkdir(outDir, { recursive: true });
  await execa(
    'npx',
    [
      'openapi-typescript-codegen',
      '--input',
      inputSpecFile,
      '--output',
      outDir,
      '--client',
      'fetch',
      '--useOptions',
      '--useUnionTypes',
      '--exportModels',
      'true',
      '--exportServices',
      'false',
      '--exportCore',
      'false',
      '--postfixModels',
      'DTO', // 可去掉
    ],
    { stdio: 'inherit' },
  );
}
