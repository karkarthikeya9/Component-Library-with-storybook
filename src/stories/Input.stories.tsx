import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/Input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
  },
  args: { label: 'Email address', placeholder: 'you@example.com' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHelperText: Story = { args: { helperText: 'We will never share your email.' } };
export const WithError: Story = { args: { error: 'A valid email is required.' } };
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled input' } };
export const Required: Story = { args: { required: true } };
export const FullWidth: Story = { args: { fullWidth: true } };
