import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../src/components/Badge/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders dot variant with accessible status text', () => {
    render(<Badge dot>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
    // The visually-hidden status text describes the badge status.
    expect(screen.getByText('default status')).toBeInTheDocument();
  });
});
