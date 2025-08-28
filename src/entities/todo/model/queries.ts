import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';

import { fetchTodos, createTodo } from './api';
import { QK } from './keys';
import type { Todo, CreateTodoInput } from './schemas';

export function useTodos(): UseQueryResult<Todo[], unknown> {
  return useQuery({
    queryKey: QK.todos(),
    queryFn: async () => {
      const res = await fetchTodos();
      if (!res.ok) throw res.error;
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useCreateTodo(): UseMutationResult<Todo, unknown, CreateTodoInput, unknown> {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      const res = await createTodo(input);
      if (!res.ok) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      // 重新拉取列表
      void qc.invalidateQueries({ queryKey: QK.todos() });
    },
  });
}

// 也可扩展：乐观更新版
// export function useCreateTodoOptimistic(): UseMutationResult<Todo, unknown, CreateTodoInput, unknown> {
//   const qc = useQueryClient()
//   return useMutation({
//     mutationFn: createTodo,
//     onMutate: async (input) => {
//       await qc.cancelQueries({ queryKey: QK.todos() })
//       const prev = qc.getQueryData<Todo[]>(QK.todos())
//       if (prev) {
//         qc.setQueryData<Todo[]>(QK.todos(), [
//           ...prev,
//           { id: Date.now(), title: input.title, completed: false },
//         ])
//       }
//       return { prev }
//     },
//     onError: (_err, _vars, ctx) => {
//       if (ctx?.prev) qc.setQueryData(QK.todos(), ctx.prev)
//     },
//     onSettled: () => void qc.invalidateQueries({ queryKey: QK.todos() }),
//   })
// }
