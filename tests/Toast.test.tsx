import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, ToastViewport, useToast } from '../src/components/Toast/Toast';

function Trigger() {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast('Hello, world!')}>
      show
    </button>
  );
}

function App() {
  return (
    <ToastProvider>
      <Trigger />
      <ToastViewport />
    </ToastProvider>
  );
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a toast via useToast', () => {
    render(<App />);
    fireEvent.click(screen.getByText('show'));
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('auto-dismisses after the default duration', () => {
    render(<App />);
    fireEvent.click(screen.getByText('show'));
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByText('Hello, world!')).not.toBeInTheDocument();
  });

  it('manual dismiss works', () => {
    render(<App />);
    fireEvent.click(screen.getByText('show'));
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    expect(screen.queryByText('Hello, world!')).not.toBeInTheDocument();
  });
});
