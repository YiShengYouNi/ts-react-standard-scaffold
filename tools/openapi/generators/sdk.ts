// tools/openapi/generators/sdk.ts
import fs from 'fs/promises';
import path from 'path';

import { execa } from 'execa';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function generateSDK(inputSpecFile: string, outDir: string, dtoModelsDir: string) {
  await execa(
    'npx',
    [
      'openapi-typescript-codegen',
      '--input',
      inputSpecFile,
      '--output',
      outDir,
      '--client',
      'fetch', // 或 axios
      '--useOptions',
      '--useUnionTypes',
      '--exportModels',
      'false', // 只要 services + core
      '--exportServices',
      'true',
      '--exportCore',
      'true',
      '--postfixModels',
      'DTO', // 与 DTO 侧保持一致
    ],
    { stdio: 'inherit' },
  );

  // 将 services 中的 `from '../models/XXX'` 改为指向 dtoModelsDir
  const servicesDir = path.join(outDir, 'services');
  const entries = await fs.readdir(servicesDir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((e) => e.isFile() && e.name.endsWith('.ts'))
      .map(async (e) => {
        const file = path.join(servicesDir, e.name);
        const content = await fs.readFile(file, 'utf-8');
        const rel = path.relative(path.dirname(file), dtoModelsDir).replace(/\\/g, '/');
        const replaced = content.replace(
          /from\s+['"]\.\.\/models\/([^'"]+)['"]/g,
          (_m, p1) => `from '${rel}/${p1}'`,
        );
        if (replaced !== content) {
          await fs.writeFile(file, replaced, 'utf-8');
        }
      }),
  );
}
