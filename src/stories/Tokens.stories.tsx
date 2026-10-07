import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '../tokens';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-9 w-9 shrink-0 rounded-md border border-border"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{name}</div>
        <code className="block truncate text-xs text-muted">--color-{name}</code>
        <code className="block truncate text-xs text-muted">{value}</code>
      </div>
    </div>
  );
}

function TokensPage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 text-2xl font-bold text-foreground">Design Tokens</h1>
      <p className="mb-8 text-muted">
        All tokens are defined once as CSS variables in{' '}
        <code className="rounded bg-surface px-1 py-0.5">src/styles/globals.css</code> and mirrored as
        a typed object in <code className="rounded bg-surface px-1 py-0.5">src/tokens/index.ts</code>.
      </p>

      <Section title="Colors">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(tokens.colors).map(([name, value]) => (
            <ColorSwatch key={name} name={name} value={value} />
          ))}
        </div>
      </Section>

      <Section title="Spacing">
        <div className="space-y-2">
          {Object.entries(tokens.spacing).map(([name, value]) => (
            <div key={name} className="flex items-center gap-3">
              <span
                className="inline-block h-4 rounded-sm bg-primary"
                style={{ width: value }}
                aria-hidden="true"
              />
              <code className="text-sm text-muted">
                --spacing-{name}: {value}
              </code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Border radius">
        <div className="flex flex-wrap items-end gap-6">
          {Object.entries(tokens.radius).map(([name, value]) => (
            <div key={name} className="text-center">
              <div
                className="mx-auto h-16 w-16 border-2 border-primary"
                style={{ borderRadius: value }}
              />
              <code className="mt-2 block text-xs text-muted">
                --radius-{name}: {value}
              </code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font sizes">
        <div className="space-y-2">
          {Object.entries(tokens.fontSizes).map(([name, value]) => (
            <div key={name} className="flex items-baseline gap-4">
              <span className="w-24 shrink-0 text-sm text-muted">{name}</span>
              <span style={{ fontSize: value }} className="text-foreground">
                The quick brown fox
              </span>
              <code className="text-xs text-muted">--text-{name}: {value}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="flex flex-wrap gap-6">
          {Object.entries(tokens.shadows).map(([name, value]) => (
            <div key={name} className="text-center">
              <div
                className="h-20 w-28 rounded-lg border border-border bg-background"
                style={{ boxShadow: value }}
              />
              <code className="mt-2 block text-xs text-muted">--shadow-{name}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Transitions">
        <ul className="list-inside list-disc space-y-1 text-sm text-foreground">
          {Object.entries(tokens.transitions).map(([name, value]) => (
            <li key={name}>
              <code className="text-muted">--transition-duration-{name}:</code> {value}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

const meta = {
  title: 'Design Tokens/Overview',
  component: TokensPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TokensPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TokensPage />,
};
