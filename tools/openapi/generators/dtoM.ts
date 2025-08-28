import { execa } from 'execa';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function generateDTO(inputSpecFile: string, outFile: string) {
  // 依赖 openapi-typescript
  await execa(
    'npx',
    [
      'openapi-typescript',
      inputSpecFile,
      '-o',
      outFile,
      '--export-type', // 仅导出 type，避免 interface 冲突
    ],
    { stdio: 'inherit' },
  );
}
