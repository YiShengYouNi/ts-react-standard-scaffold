import {
  TodoListSchema,
  CreateTodoInputSchema,
  CreateTodoRespSchema,
  type CreateTodoInput,
  type Todo,
} from './schemas';

import { get, post } from '@/shared/lib/clients';
import type { HttpError } from '@/shared/lib/http';
import type { Result } from '@/shared/lib/result';

// 查询 Todo 列表
export function fetchTodos(): ReturnType<typeof get<Todo[]>> {
  return get('/todos', TodoListSchema);
}

// 新建 Todo
export function createTodo(input: CreateTodoInput): Promise<Result<Todo, HttpError | Error>> {
  // 入参先本地校验（更快暴露错误）
  const parsed = CreateTodoInputSchema.safeParse(input);
  if (!parsed.success) {
    return Promise.resolve({ ok: false, error: parsed.error });
  }
  return post('/todos', parsed.data, CreateTodoRespSchema);
}
