import React, { type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: unknown): void {
    // In production, send to your error tracker here
    console.error('ErrorBoundary caught an error:', error);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong. Please refresh.</div>;
    } else {
      return this.props.children;
    }
  }
}
