import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

const ProblemChild: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Simulated runtime rendering failure');
  }
  return <div>Operational child component</div>;
};

describe('ErrorBoundary Component', () => {
  // Prevent noisy console.error in test runner for expected exceptions
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Operational child component')).toBeInTheDocument();
  });

  it('catches render error and displays the user-friendly recovery UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/An Unexpected Display Exception Occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/Runtime Protection Fault/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulated runtime rendering failure/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload Application/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Return to Home/i })).toBeInTheDocument();
  });

  it('renders custom fallback if provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom failure fallback</div>}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom failure fallback')).toBeInTheDocument();
    expect(screen.queryByText(/An Unexpected Display Exception Occurred/i)).not.toBeInTheDocument();
  });
});
