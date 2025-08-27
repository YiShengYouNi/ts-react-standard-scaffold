import React from 'react'

export function useExample() {
  const [count, setCount] = React.useState(0)
  const inc = React.useCallback(() => setCount(c => c + 1), [])
  return { count, inc } as const
}
