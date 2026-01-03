import { Component, type ReactNode } from 'react';

type TErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type TErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<
  TErrorBoundaryProps,
  TErrorBoundaryState
> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
