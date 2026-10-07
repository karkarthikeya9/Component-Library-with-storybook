import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, ToastViewport, useToast } from '../components/Toast/Toast';
import { Button } from '../components/Button/Button';

function ToastDemo() {
  const { success, error, info, warning, toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => success('Settings saved successfully')}>Success</Button>
      <Button variant="destructive" onClick={() => error('Something went wrong')}>
        Error
      </Button>
      <Button variant="secondary" onClick={() => info('Just so you know')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => warning('You are running low on storage')}>
        Warning
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast({ variant: 'info', title: 'With title', message: 'A titled toast', duration: 0 })}
      >
        Persistent
      </Button>
    </div>
  );
}

function WithProvider() {
  return (
    <ToastProvider>
      <ToastDemo />
      <ToastViewport />
    </ToastProvider>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ToastViewport,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ToastViewport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WithProvider />,
};
