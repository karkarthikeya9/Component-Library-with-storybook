import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, type ModalProps } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';

type ModalDemoProps = Omit<ModalProps, 'open' | 'onClose'>;

function ModalDemo(props: ModalDemoProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...props} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    open: { control: false },
    onClose: { control: false },
  },
  args: {
    open: false,
    onClose: () => {},
    title: 'Delete account',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    children: (
      <p className="text-foreground">
        Are you sure you want to delete your account? This action cannot be undone.
      </p>
    ),
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </>
    ),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoRender = (args: ModalProps) => {
  const { open: _open, onClose: _onClose, ...rest } = args;
  return <ModalDemo {...rest} />;
};

export const Default: Story = {
  render: demoRender,
};

export const Small: Story = {
  args: { size: 'sm' },
  render: demoRender,
};

export const Large: Story = {
  args: { size: 'lg' },
  render: demoRender,
};

export const NoFooter: Story = {
  args: { footer: undefined },
  render: demoRender,
};
