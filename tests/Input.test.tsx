import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../src/components/Input/Input';

describe('Input', () => {
  it('associates label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows error and aria-invalid when error passed', () => {
    render(<Input label="Email" error="A valid email is required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('A valid email is required');
    expect(screen.getByText('A valid email is required')).toBeInTheDocument();
  });

  it('calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Email" onChange={onChange} />);
    await user.type(screen.getByLabelText('Email'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows helper text when no error', () => {
    render(<Input label="Email" helperText="We never share your email." />);
    expect(screen.getByText('We never share your email.')).toBeInTheDocument();
  });
});
