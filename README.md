# TS + React 标准项目（含 Tailwind / Vitest / Storybook）

这是一个基于 Vite + React + TypeScript 的前端项目脚手架，开箱即用，特别适合 大型复杂业务系统（库存、工单、报表、配件、物流、订单、资产…）的开发。

项目内置常用工程化规范（ESLint、Prettier、Husky、Commitlint）、UI 框架（Tailwind）、数据层（React Query）、测试基线（Vitest）、设计系统（Storybook），并提供一套 面向大型项目的目录规划。

## 🚀 特性

- TypeScript 严格模式：开启 strict、noUncheckedIndexedAccess、exactOptionalPropertyTypes 等配置，保证类型安全。

- 代码规范：
  - ESLint + Prettier（已集成 React/TS/Hook/A11y 插件）

  - Husky + lint-staged + commitlint（强制提交规范）

- UI 框架：集成 TailwindCSS，支持原子化 CSS 与主题扩展。

- 状态与路由：
  - React Router v6（路由拆分 + Lazy/Suspense）

  - TanStack Query（数据请求与缓存管理）

- 测试基线：
  - Vitest + React Testing Library + JSDOM

  - 示例单元测试（Button 组件）

- 文档与设计系统：
  - Storybook 8（Vite 构建）

示例组件故事（Button 组件）

## 📂 目录结构（面向中大型项目）

注：请根据实际情况调整目录结构，此处仅做说明

```bash
ts-react-standard-scaffold/
├─ .husky/                  # Git hooks
├─ .storybook/              # Storybook 配置
├─ src/
│  ├─ app/                  # 应用壳：入口、全局 Provider、路由、错误边界
│  │  ├─ providers/
│  │  ├─ router.tsx
│  │  ├─ index.tsx
│  ├─ pages/                # 数据请求 聚合 feature/entity
│  │  ├─ inventory/        # 库存管理
│  │  │  ├─ InventoryListPage.tsx
│  │  │  ├─ InventoryDetailPage.tsx
│  │  ├─ orders/           # 订单管理
│  │  │  ├─ OrderListPage.tsx
│  │  │  ├─ OrderDetailPage.tsx
│  │  └─ users/            # 用户管理
│  │     ├─ ......
│  ├─ features/             # 业务功能（跨实体的交互逻辑）
│  │  ├─ order/
│  │  │  ├─ model/queries.ts       # useCreateOrder
│  │  │  └─ ui/CreateOrderForm.tsx
│  │  ├─ report/
│  │  │  ├─ model/queries.ts
│  │  │  └─ ui/ExportButton.tsx
│  ├─ entities/             # 业务实体（核心模型 + 查询 + 基础 UI）
│  │  ├─ inventory/
│  │  │  ├─ model/
│  │  │  │  ├─ schemas.ts
│  │  │  │  ├─ api.ts       # 纯数据访问层（http调用）
│  │  │  │  ├─ keys.ts
│  │  │  │  └─ queries.ts   # 视图数据层（React Query 适配）
│  │  │  └─ ui/
│  │  │      ├─ InventoryTable.tsx
│  │  ├─ order/
│  │  │  ├─ model/{schemas.ts,api.ts,keys.ts,queries.ts}
│  │  │  └─ ui/{OrderTable.tsx, OrderStatusTag.tsx}
│  │  ├─ .....
│  ├─ shared/               # 通用资源（无业务语义，任何层可用）
│  │  ├─ components/                # 通用组件（Button、Modal…）
│  │  ├─ hooks/             # 通用 UI Hook（useDebounce/useEventListener…）
│  │  ├─ lib/               # 工具函数（httpClient、result、date、format）
│  │  ├─ config/            # 环境变量、常量
│  │  ├─ types/             # TS 类型（纯类型定义）不包含任何运行时代码、无副作用、不依赖第三方运行时库
│  │  ├─ store/             # 全局状态（如 appStore、themeStore）
│  │  └─ styles/            # 全局样式（Tailwind）
│  │  └─ stories/           # storybook
│  ├─ routes/               # 路由定义
│  └─ main.tsx              # 应用的真实入口模块，负责执行 React 挂载逻辑
├─ tailwind.config.ts       # Tailwind 配置
├─ vite.config.ts           # Vite 配置（含 Vitest）
├─ index.html               # 构建入口
└─ ...

```

## 目录划分思路

- app/

  应用的外壳：React 挂载入口、全局 Provider、主题/国际化、路由定义、错误边界。

- pages/

  路由页面，只做布局和组合。不直接写接口调用，而是调用 features/entities 提供的 Hook 和 UI。

- features/

  跨多个实体的业务功能，例如“创建订单”“导出报表”“分配工单”。
  - model/：React Query 的业务动作 Hook（可依赖多个 entity）
  - ui/：对应的交互组件（表单、对话框、按钮）

- entities/

  单一业务实体的模型层和基础 UI，保证复用性。
  - model/：
    - schemas.ts → zod 校验 & DTO
    - api.ts → 接口请求（fetchXxx）
    - keys.ts → React Query key 工厂
    - queries.ts → 实体级别的 React Query Hook（useXxxList/useXxxById）
  - ui/：基础展示组件（表格、标签、卡片），只处理 UI，不包含业务逻辑

- shared/

  无业务语义的通用资源：UI 组件、工具函数、全局样式、环境变量、通用 Hook、全局状态。任何层都可以引用。

## ⚡ 快速开始

```bash
# 安装依赖
pnpm install

# 安装 Husky hooks（首次需要执行）
pnpm prepare

# 启动开发服务器
pnpm dev

# 代码检查与格式化
pnpm lint
pnpm format

# 类型检查
pnpm typecheck
```

## 🧪 测试

使用 Vitest + React Testing Library：

```bash
pnpm test          # 运行测试
pnpm test:watch    # 监听模式
pnpm test:coverage # 测试覆盖率
```

示例测试文件：src/components/**tests**/Button.test.tsx

## 📖 Storybook

组件文档与演示：

```bash
pnpm storybook         # 启动 Storybook (<http://localhost:6006>)
pnpm build-storybook   # 构建静态 Storybook
```

示例：src/components/Button.stories.tsx

## 🛠 工程规范

- 提交规范：Conventional Commits（如 feat: xxx，fix: yyy）

- 代码风格：Prettier 统一，提交前自动检查（lint-staged）

- 错误边界：内置 ErrorBoundary，避免 UI 崩溃

- 请求封装：统一 Result<T> 模式，避免异常扩散

## ✅ 推荐使用方式

- 团队内部：将该项目作为模板仓库（GitHub Template / GitLab 模板）。

- 个人项目：下载压缩包或克隆仓库，直接修改 package.json 项目名即可。

- 脚手架扩展：根据业务需要，继续追加 CI/CD 配置、E2E 测试（Playwright/Cypress）、Monorepo 支持等。
