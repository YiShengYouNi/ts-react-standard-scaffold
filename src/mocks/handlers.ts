// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

import { TodoSchema, CreateTodoRespSchema } from '@/apis/schemas';

const mem = {
  todos: [
    { id: 1, title: 'Learn Vite', completed: true },
    { id: 2, title: 'Learn React', completed: false },
    { id: 3, title: 'Learn TypeScript', completed: true },
    { id: 4, title: 'Learn Zod', completed: false },
    { id: 5, title: 'Learn Testing', completed: false },
  ],
};

const CreateTodoBodySchema = z.object({
  title: z.string().min(1).optional(),
});

export const handlers = [
  // GET /todos
  http.get('/todos', () => {
    // 可选：严格校验后再返回（演示）
    const parsed = TodoSchema.array().safeParse(mem.todos);
    if (!parsed.success) return HttpResponse.json({ message: 'invalid shape' }, { status: 500 });
    return HttpResponse.json(parsed.data, { status: 200 });
  }),

  // POST /todos
  http.post('/todos', async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const bodyParsed = CreateTodoBodySchema.safeParse(body);
    if (!bodyParsed.success) {
      return HttpResponse.json({ message: 'invalid body' }, { status: 400 });
    }
    const newTodo = { id: Date.now(), title: bodyParsed.data.title ?? '', completed: false };
    mem.todos.push(newTodo);
    const parsed = CreateTodoRespSchema.safeParse(newTodo);
    if (!parsed.success) return HttpResponse.json({ message: 'invalid shape' }, { status: 500 });
    return HttpResponse.json(parsed.data, { status: 200 });
  }),
];
