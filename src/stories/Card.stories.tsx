import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/Card/Card';
import { Button } from '../components/Button/Button';
import { Badge } from '../components/Badge/Badge';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  args: { padding: 'md' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      This is a simple card with default padding.
    </Card>
  ),
};

export const Structured: Story = {
  args: { padding: 'none' },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <Card.Header>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Account</h3>
          <Badge variant="success">Active</Badge>
        </div>
        <p className="text-sm text-muted">Manage your account settings.</p>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-foreground">Card content lives here.</p>
      </Card.Content>
      <Card.Footer className="justify-end">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </Card.Footer>
    </Card>
  ),
};
