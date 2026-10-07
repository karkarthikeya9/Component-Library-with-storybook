import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../components/Table/Table';
import { Badge } from '../components/Badge/Badge';

interface Person {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'invited' | 'suspended';
}

const meta = {
  title: 'Components/Table',
  component: Table<Person>,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    loading: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
      {
        key: 'status',
        header: 'Status',
        render: (row: Person) => (
          <Badge variant={row.status === 'active' ? 'success' : row.status === 'invited' ? 'info' : 'error'} dot>
            {row.status}
          </Badge>
        ),
      },
    ],
    data: [
      { id: 1, name: 'Ada Lovelace', role: 'Admin', status: 'active' },
      { id: 2, name: 'Alan Turing', role: 'Editor', status: 'active' },
      { id: 3, name: 'Grace Hopper', role: 'Viewer', status: 'invited' },
      { id: 4, name: 'Linus Torvalds', role: 'Editor', status: 'suspended' },
    ],
  },
} satisfies Meta<typeof Table<Person>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Striped: Story = { args: { striped: true } };

export const Hoverable: Story = { args: { hoverable: true } };

export const Loading: Story = { args: { loading: true } };

export const Empty: Story = {
  args: { data: [], emptyMessage: 'No members yet. Invite your team to get started.' },
};
