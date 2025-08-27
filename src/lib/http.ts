export type Ok<T> = { ok: true; data: T }
export type Err<E = { message: string }> = { ok: false; error: E }
export type Result<T, E = { message: string }> = Ok<T> | Err<E>

export async function httpGet<T>(url: string, init?: RequestInit): Promise<Result<T>> {
  try {
    const res = await fetch(url, { method: 'GET', ...init })
    if (!res.ok) return { ok: false, error: { message: `HTTP ${res.status}` } }
    const data = (await res.json()) as T
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: { message: e instanceof Error ? e.message : 'Network error' } }
  }
}
