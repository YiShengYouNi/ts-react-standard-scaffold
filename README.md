# TS + React 标准项目（含 Tailwind / Vitest / Storybook）

这是一个基于 Vite + React + TypeScript 的前端项目脚手架，内置常用的工程化规范与工具，开箱即用。

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

## 📂 目录结构

```bash
ts-react-standard-scaffold/
├─ .husky/                  # Git hooks
├─ .storybook/              # Storybook 配置
├─ src/
│  ├─ components/           # 通用组件（Button、ErrorBoundary）
│  │  ├─ __tests__/         # 组件测试
│  │  └─ Button.stories.tsx # Storybook 示例
│  ├─ hooks/                # 自定义 Hooks
│  ├─ lib/                  # 请求工具/工具函数
│  ├─ pages/                # 页面组件（Home、About）
│  ├─ routes/               # 路由定义
│  ├─ styles/               # 全局样式（Tailwind）
│  ├─ types/                # 公共类型工具
│  └─ main.tsx              # 项目入口
├─ tailwind.config.ts       # Tailwind 配置
├─ vite.config.ts           # Vite 配置（含 Vitest）
└─ ...
```

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
