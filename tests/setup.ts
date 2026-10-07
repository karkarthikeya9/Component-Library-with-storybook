import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// With Vitest `globals` disabled, React Testing Library cannot auto-register
// its `afterEach(cleanup)` hook, so we register it explicitly to unmount the
// rendered tree after every test.
afterEach(() => {
  cleanup();
});
