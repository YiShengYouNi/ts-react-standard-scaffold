// tools/openapi/fetchAndGenWithSDK.ts
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

import { SERVICES } from './codegen.config';
import { generateDTO } from './generators/dto';
// import { generateSDK } from './generators/sdk';

// 删除整个目录
async function cleanDir(dir: string) {
  await fs.rm(dir, { recursive: true, force: true });
}

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
    await cleanDir(svc.outputs.dto);
    await ensureDir(svc.outputs.dto);
    await generateDTO(tmp, svc.outputs.dto);

    /**
     * 前端不建议使用生成的SDK，原因有：
     * 冗余封装：生成的方法通常只是套一层 fetch，并不会包含业务逻辑（错误处理、权限拦截、重试、埋点等都没有）。
     * 难以统一拦截：每个 service 各自调用 request 层，如果要统一做鉴权 token、全局错误提示，还得 hack SDK 或自定义模板。
     * 方法命名不友好：生成器只能按路径+HTTP方法命名（比如 getOrders1），可读性差，调用时还要翻代码。
     * 耦合风险：后端一改 schema，SDK 方法签名可能大改；前端业务代码大量引用 SDK，维护成本变高
     */
    // 2) 生成 SDK（目录）并改写 import
    // if (svc.outputs.sdk) {
    //   await cleanDir(svc.outputs.sdk);                          // 例如: src/sdk/order
    //   await ensureDir(svc.outputs.sdk);
    //   const dtoModelsDir = path.join(svc.outputs.dto, 'models');
    //   await generateSDK(tmp, svc.outputs.sdk, dtoModelsDir);
    // }

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
