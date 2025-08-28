# model 介绍

## api.ts 与 queries.ts 的对比

| 方面      | `api.ts`（Endpoints）                                          | `queries.ts`（React Query Hooks）                                             |
| --------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 核心职责  | 封装 HTTP：URL、方法、入参/出参类型、运行时校验（zod/valibot） | 暴露 `useXxx` Hook：缓存、并发去重、重试、staleTime、失效策略、预取、乐观更新 |
| 输入/输出 | 入参 = DTO；出参 = `Result<DTO, ErrorLike>`                    | 返回 `UseQueryResult<DTO,…>` / `UseMutationResult<DTO,…>`                     |
| 依赖      | `shared/lib/httpClient`、`shared/types/dto`、`schemas.ts`      | 依赖 `api.ts` + `@tanstack/react-query`                                       |
| 运行环境  | 纯函数，可在任何环境（SSR/Node/浏览器/脚本）调用               | 仅在 React 组件树中使用                                                       |
| 可测试性  | **单测更轻**：传入入参，断言返回值/错误                        | **需要 React 测试环境**（RTL + QueryClientProvider）                          |
| 复用场景  | CLI 脚本、服务端渲染、批处理、非 React 环境                    | 页面与组件的数据获取与提交                                                    |
| 命名      | `fetchOrder`, `createOrder`（动词）                            | `useOrderById`, `useCreateOrder`（useXxx）                                    |
