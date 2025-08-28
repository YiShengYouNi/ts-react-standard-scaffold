import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tools/openapi/openapi.codegen.config.ts
export type Service = {
  name: 'order' | 'inventory' | 'user';
  // 1) URL（推荐，后端统一暴露 /openapi.json）或 2) Git 文件路径
  source: { type: 'url' | 'file'; path: string; headers?: () => Record<string, string> };
  // 生成项：只要 DTO，或顺带生成 SDK
  outputs: { dto: string; sdk?: string };
};

// ESM 格式
export const SERVICES: Service[] = [
  // 订单服务（URL）
  {
    name: 'order',
    source: {
      type: 'file',
      // path: process.env.OPENAPI_ORDER_URL || 'https://api.internal/order/openapi.json',
      path: path.resolve(__dirname, './testFile/order.yml'),
      // 可选：鉴权请求头（例如内网网关 token）
      // headers: () => ({
      //   Authorization: `Bearer ${process.env.OPENAPI_TOKEN || ''}`,
      // }),
    },
    outputs: {
      dto: 'src/shared/types/dto/__generated__/order',
      sdk: 'src/shared/sdk/order',
    },
  },

  // 库存服务（URL）
  // {
  //   name: 'inventory',
  //   source: {
  //     type: 'url',
  //     path: process.env.OPENAPI_INVENTORY_URL || 'https://api.internal/inventory/openapi.json',
  //     // headers: () => ({
  //     //   Authorization: `Bearer ${process.env.OPENAPI_TOKEN || ''}`,
  //     // }),
  //   },
  //   outputs: {
  //     dto: 'src/shared/types/dto/__generated__/inventory.ts',
  //     sdk: 'src/shared/sdk/inventory.ts'
  //   },
  // },

  // 用户服务（本地文件；例如从 mono-repo 或子仓同步的 spec）
  {
    name: 'user',
    source: {
      type: 'file',
      path: path.resolve(__dirname, './testFile/user.yml'),
    },
    outputs: {
      dto: 'src/shared/types/dto/__generated__/user',
      sdk: 'src/shared/sdk/user',
    },
  },
];
