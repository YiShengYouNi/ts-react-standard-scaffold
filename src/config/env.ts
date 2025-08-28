type AppEnv = {
  APP_NAME: string;
  API_BASE_URL: string;
  ENABLE_MOCK: boolean;
  SENTRY_DSN?: string | undefined;
};

function toBool(v?: string) {
  return v === 'true';
}

export const env: AppEnv = (() => {
  const { VITE_APP_NAME, VITE_API_BASE_URL, VITE_ENABLE_MOCK, VITE_SENTRY_DSN } = import.meta.env;

  if (!VITE_API_BASE_URL) {
    // 保底，避免 undefined 参与拼接
    console.warn('[env] Missing VITE_API_BASE_URL, fallback to "/"');
  }

  return {
    APP_NAME: VITE_APP_NAME ?? 'TS + React Standard Project',
    API_BASE_URL: VITE_API_BASE_URL ?? '/',
    ENABLE_MOCK: toBool(VITE_ENABLE_MOCK),
    SENTRY_DSN: VITE_SENTRY_DSN || undefined,
  };
})();
