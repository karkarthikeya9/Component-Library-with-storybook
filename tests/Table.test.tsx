import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from '../src/components/Table/Table';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
];

const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

describe('Table', () => {
  it('renders headers and rows', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows empty message when data empty', () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('shows a custom empty message', () => {
    render(<Table columns={columns} data={[]} emptyMessage="Nothing here yet" />);
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
  });

  it('uses a custom render for cells', () => {
    render(
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'uppercase', header: 'Uppercase', render: (row) => row.name.toUpperCase() },
        ]}
        data={data}
      />,
    );
    expect(screen.getByText('ALICE')).toBeInTheDocument();
    expect(screen.getByText('BOB')).toBeInTheDocument();
  });
});
