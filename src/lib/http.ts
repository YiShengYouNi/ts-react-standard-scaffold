export type HttpError = {
  status: number;
  message: string;
  details?: unknown;
};

export function toHttpError(status: number, message: string, details?: unknown): HttpError {
  return { status, message, details };
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = 10000, signal, ...rest } = init;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input, { ...rest, signal: signal ?? controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}
