import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
    },
    options: {
      storySort: {
        order: ['Introduction', 'Design Tokens', 'Components'],
      },
    },
  },
};

export default preview;
