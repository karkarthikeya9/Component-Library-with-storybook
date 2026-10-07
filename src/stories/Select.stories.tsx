import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '../components/Select/Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Role',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
      { value: 'billing', label: 'Billing', disabled: true },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithPlaceholder: Story = { args: { placeholder: 'Select a role…' } };
export const WithHelperText: Story = { args: { helperText: 'Determines the default permissions.' } };
export const WithError: Story = { args: { error: 'A role is required.' } };
export const Disabled: Story = { args: { disabled: true } };
