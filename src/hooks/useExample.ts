import { useState, useCallback } from 'react';

type UseExampleReturn = {
  readonly count: number;
  readonly inc: () => void;
};

export function useExample(): UseExampleReturn {
  const [count, setCount] = useState(0);
  const inc = useCallback(() => setCount((c) => c + 1), []);
  return { count, inc } as const;
}
