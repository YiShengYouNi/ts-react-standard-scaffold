// 统一的 请求客户端：读取 env.API_BASE_URL，做状态码与 zod 校验，返回 Result

import type { ZodType, ZodError } from 'zod';

import { env } from '@/shared/config/env';
import { fetchWithTimeout, toHttpError, type HttpError } from '@/shared/lib/http';
import { ok, err, type Result } from '@/shared/lib/result';

function isAbsUrl(s: string) {
  return /^https?:\/\//i.test(s);
}

function resolveApiUrl(path: string): string {
  const base = (env.API_BASE_URL ?? '').trim();

  // 绝对地址：直接拼
  if (base && isAbsUrl(base)) return new URL(path, base).toString();

  // 同源：直接用相对路径让 fetch 走当前 origin（避免 `new URL(..., '/')` 报错）
  // 这里也可用：new URL(path, (globalThis.location?.origin ?? '') + base).toString()
  return path.startsWith('/') ? path : `/${path}`;
}

async function json<T>(res: Response): Promise<T> {
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

export async function get<T>(
  path: string,
  schema: ZodType<T>,
  init?: RequestInit,
): Promise<Result<T, HttpError | ZodError>> {
  const url = resolveApiUrl(path);
  const res = await fetchWithTimeout(url, { method: 'GET', ...init });
  if (!res.ok) return err(toHttpError(res.status, res.statusText));
  const data = await json<unknown>(res);
  const parsed = schema.safeParse(data);
  return parsed.success ? ok(parsed.data) : err(parsed.error);
}

export async function post<TReq, TResp>(
  path: string,
  body: TReq,
  schema: ZodType<TResp>,
  init?: RequestInit,
): Promise<Result<TResp, HttpError | ZodError>> {
  const url = resolveApiUrl(path);
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const details = await res.text().catch(() => undefined);
    return err(toHttpError(res.status, res.statusText, details));
  }
  const data = await json<unknown>(res);
  const parsed = schema.safeParse(data);
  return parsed.success ? ok(parsed.data) : err(parsed.error);
}
