import type { FC } from 'react';

import Button from '@/shared/components/Button';
import { useExample } from '@/shared/hooks/useExample';
import { useAppStore } from '@/shared/stores/app.store';

const Home: FC = () => {
  const { count, inc } = useExample();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

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
      </div>
    </section>
  );
};

export default Home;
