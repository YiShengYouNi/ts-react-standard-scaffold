import type { FC } from 'react';

import { useTodos, useCreateTodo } from '@/apis/hooks';
import Button from '@/components/Button';
import { useExample } from '@/hooks/useExample';
import { useAppStore } from '@/stores/app.store';

const Home: FC = () => {
  const { count, inc } = useExample();
  const { data, isLoading, error } = useTodos();
  const create = useCreateTodo();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div role="alert">Failed: {String(error)}</div>;

  return (
    <section>
      <h1>Home</h1>
      <p>
        Count: <strong>{count}</strong>
      </p>
      <Button onClick={inc}>Increment</Button>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span>Theme: {theme}</span>
          <button className="btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme
          </button>
        </div>

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

export default Home;
