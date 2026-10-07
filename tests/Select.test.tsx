import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../src/components/Select/Select';

const options = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
];

describe('Select', () => {
  it('renders options', () => {
    render(<Select label="Role" options={options} />);
    expect(screen.getByRole('option', { name: 'Admin' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Editor' })).toBeInTheDocument();
  });

  it('calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Role" options={options} onChange={onChange} />);
    await user.selectOptions(screen.getByLabelText('Role'), 'editor');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('shows placeholder', () => {
    render(<Select label="Role" placeholder="Choose a role…" options={options} />);
    const placeholder = screen.getByRole('option', { name: 'Choose a role…' });
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toBeDisabled();
  });

  it('shows error and aria-invalid when error passed', () => {
    render(<Select label="Role" options={options} error="Role is required" />);
    const select = screen.getByLabelText('Role');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Role is required')).toBeInTheDocument();
  });
});
