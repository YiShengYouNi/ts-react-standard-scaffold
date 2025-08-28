// 运行时，zod 做“边界校验”，把后端返回的数据校验/收窄到可靠类型
import { z } from 'zod';

/**  valibot(package) 也能实现同样的效果  */

// 示例：Todo
export const TodoSchema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string().min(1),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const TodoListSchema = z.array(TodoSchema);

// 新建 Todo 的入参
export const CreateTodoInputSchema = z.object({
  title: z.string().min(1),
});
export type CreateTodoInput = z.infer<typeof CreateTodoInputSchema>;

// 新建 TODO 返回（有的后端会回整条记录）
export const CreateTodoRespSchema = TodoSchema;

export type CreateTodoResp = z.infer<typeof CreateTodoRespSchema>;

// 通用分页（示例，可扩展）
export const PageSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
});

export type Page = z.infer<typeof PageSchema>;
