import type { FC } from 'react';

import Button from '@/components/Button';
import { useExample } from '@/hooks/useExample';

const Home: FC = () => {
  const { count, inc } = useExample();
  return (
    <section>
      <h1>Home</h1>
      <p>This is a minimal baseline that follows our TS + React rules.</p>
      <p>
        Count: <strong>{count}</strong>
      </p>
      <Button onClick={inc}>Increment</Button>
    </section>
  );
};

export default Home;
