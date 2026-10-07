import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
  Table,
  useToast,
} from '@lib';

type Role = 'Admin' | 'Editor' | 'Viewer';
type Status = 'active' | 'invited' | 'suspended';

interface Member {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
}

const members: Member[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Viewer', status: 'invited' },
  { id: 4, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Editor', status: 'suspended' },
];

const statusVariant = {
  active: 'success',
  invited: 'info',
  suspended: 'error',
} as const satisfies Record<Status, 'success' | 'info' | 'error'>;

export default function App() {
  const { success, info, error } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [displayName, setDisplayName] = useState('Ada Lovelace');
  const [role, setRole] = useState('Admin');

  return (
    <div className="min-h-screen bg-surface p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted">A demo built with the react-assignment-ui component library.</p>
          </div>
          <Button variant="outline" onClick={() => setConfirmOpen(true)}>
            Delete account
          </Button>
        </header>

        <Card padding="none">
          <Card.Header>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Team members</h2>
              <Badge variant="primary">{members.length}</Badge>
            </div>
            <p className="text-sm text-muted">People with access to this workspace.</p>
          </Card.Header>
          <Card.Content className="p-0">
            <Table
              columns={[
                { key: 'name', header: 'Name' },
                {
                  key: 'role',
                  header: 'Role',
                  render: (row) => <Badge variant="default">{row.role}</Badge>,
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (row) => (
                    <Badge variant={statusVariant[row.status]} dot>
                      {row.status}
                    </Badge>
                  ),
                },
                {
                  key: 'actions',
                  header: '',
                  align: 'right',
                  render: (row) => (
                    <Button size="sm" variant="ghost" onClick={() => info(`Selected ${row.name}`)}>
                      View
                    </Button>
                  ),
                },
              ]}
              data={members}
              striped
              hoverable
            />
          </Card.Content>
        </Card>

        <Card padding="none">
          <Card.Header>
            <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          </Card.Header>
          <Card.Content className="space-y-4">
            <Input
              label="Display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              fullWidth
            />
            <Select
              label="Default role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Editor', label: 'Editor' },
                { value: 'Viewer', label: 'Viewer' },
              ]}
            />
          </Card.Content>
          <Card.Footer className="justify-end">
            <Button onClick={() => success('Settings saved!')}>Save settings</Button>
          </Card.Footer>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => success('Copied to clipboard')}>
            Success toast
          </Button>
          <Button variant="outline" onClick={() => info('Just so you know')}>
            Info toast
          </Button>
          <Button variant="destructive" onClick={() => error('Something went wrong')}>
            Error toast
          </Button>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete account"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmOpen(false);
                error('Account deletion is disabled in this demo');
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-foreground">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
