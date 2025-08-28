# openapi tool 介绍

有2种实现方式

- 拉取式（Pull）自动同步+生成
- 发布式（Push）内网 NPM 包 （私仓）

这里，我们采用第一种方式

## 目录结构

```bash
/tools/openapi/                   # 脚本 & 生成配置
  openapi.codegen.config.ts       # 统一登记各服务的 spec 来源 & 生成目标
  fetch-and-generate.ts           # 核心脚本（抓取→比对→生成）
  generators/
    dto.ts                        # 用 openapi-typescript 生成 type-only DTO
    sdk.ts                        # 可选：用 openapi-generator 生成可调用 SDK
/src/shared/types/dto/            # 生成产物（type-only，参与编译不参与运行）
  └─ __generated__/
       order.ts
       inventory.ts
       user.ts
/src/shared/sdk/                  # 可选：生成的 fetch/axios SDK（运行时代码）
```
