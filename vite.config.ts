import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.VITE_PORT) || 5173, open: true },
  resolve: { alias: { '@': '/src' } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['**/tests/**/*.{test,spec}.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'], // 👈 测试目录集中
    css: true,
  },
});
