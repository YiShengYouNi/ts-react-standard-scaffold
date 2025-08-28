import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(), // 1) 自动分 vendor
    visualizer({
      // 2) 构建后生成分析报告
      filename: 'stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: { port: Number(process.env.VITE_PORT) || 5173, open: true },
  resolve: { alias: { '@': '/src' } },
  build: {
    target: 'es2022', // 3) 现代输出，少 polyfill
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'terser', // 4) 更小的压缩（比 esbuild 更狠）
    terserOptions: {
      compress: {
        passes: 2,
        drop_console: true, // 5) 去掉 console/debugger
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'],
      },
      mangle: true,
      format: { comments: false },
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks(id) {
          // 6) 手动拆包：react/react-dom、router、query 各自成块
          if (id.includes('node_modules')) {
            if (
              id.includes('react-dom') ||
              id.includes('react/jsx-runtime') ||
              id.includes('react')
            )
              return 'vendor-react';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('@tanstack')) return 'vendor-query';
            return 'vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['**/tests/**/*.{test,spec}.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'], // 👈 测试目录集中
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
