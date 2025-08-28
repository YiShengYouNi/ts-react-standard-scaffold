// tools/openapi/fetchAndGenOnlyModel.ts
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

import { SERVICES } from './codegen.config';
import { generateDTO } from './generators/dtoM';

async function readSpec(svc: (typeof SERVICES)[number]) {
  if (svc.source.type === 'url') {
    const res = await fetch(svc.source.path);
    if (!res.ok) throw new Error(`[OpenAPI] Fetch failed: ${svc.name} ${res.status}`);
    return await res.text();
  }
  return await fs.readFile(path.resolve(svc.source.path), 'utf-8');
}

function hash(text: string) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

async function ensureDir(p: string) {
  await fs.mkdir(path.dirname(p), { recursive: true });
}

async function run() {
  for (const svc of SERVICES) {
    const spec = await readSpec(svc);
    const specHash = hash(spec);
    const stamp = `.openapi-${svc.name}.sha`;
    const prev = await fs.readFile(stamp, 'utf-8').catch(() => '');

    if (prev === specHash) {
      // eslint-disable-next-line no-console
      console.log(`[OpenAPI] ${svc.name} unchanged, skip generation.`);
      continue;
    }

    // 写入临时文件供生成器使用
    const tmp = `./.openapi-${svc.name}.json`;
    await fs.writeFile(tmp, spec, 'utf-8');

    // 1) 生成 DTO（type-only）
    await ensureDir(svc.outputs.dto);
    await generateDTO(tmp, svc.outputs.dto);

    await fs.writeFile(stamp, specHash, 'utf-8');
    await fs.rm(tmp);
    // eslint-disable-next-line no-console
    console.log(`[OpenAPI] ${svc.name} generated ✅`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
