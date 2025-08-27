import React from 'react'
import Button from '@/components/Button'
import { useExample } from '@/hooks/useExample'

export default function Home(): JSX.Element {
  const { count, inc } = useExample()
  return (
    <section>
      <h1>Home</h1>
      <p>This is a minimal baseline that follows our TS + React rules.</p>
      <p>Count: <strong>{count}</strong></p>
      <Button onClick={inc}>Increment</Button>
    </section>
  )
}
