// 结果类型：避免抛异常在业务层横飞
export type Ok<T> = { ok: true; data: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E = unknown> = Ok<T> | Err<E>;

export function ok<T>(data: T): Ok<T> {
  return { ok: true, data };
}
export function err<E = unknown>(error: E): Err<E> {
  return { ok: false, error };
}
