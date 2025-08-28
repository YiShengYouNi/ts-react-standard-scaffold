import type { FC } from 'react';

import { useTodos, useCreateTodo } from '@/entities/todo/model/queries';

const Todo: FC = () => {
  const { data, isLoading, error } = useTodos();
  const create = useCreateTodo();

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div role="alert">Failed: {String(error)}</div>;

  return (
    <section>
      <h1>Todo</h1>

      <div className="space-y-4">
        <ul className="list-disc pl-6">
          {data?.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>

        <button
          className="btn border-gray-300 bg-white hover:bg-gray-50"
          onClick={() => create.mutate({ title: 'New Todo' })}
          disabled={create.isPending}
        >
          {create.isPending ? 'Creating…' : 'Add Todo'}
        </button>
      </div>
    </section>
  );
};

export default Todo;
