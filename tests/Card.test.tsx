import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../src/components/Card/Card';

describe('Card', () => {
  it('renders header/content/footer subcomponents', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders children directly', () => {
    render(<Card>Simple content</Card>);
    expect(screen.getByText('Simple content')).toBeInTheDocument();
  });
});
