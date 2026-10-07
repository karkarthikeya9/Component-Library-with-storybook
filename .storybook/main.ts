import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    // Note: `@storybook/addon-essentials` was removed in Storybook 9+; its
    // contents (controls, actions, viewport, backgrounds, toolbars, measure,
    // outline) are now built into Storybook core. We register the two addons
    // that remain standalone: docs and a11y.
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    // Inject the Tailwind CSS v4 Vite plugin so `@import "tailwindcss"` and
    // design-token utilities are compiled inside the Storybook preview build.
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    return viteConfig;
  },
};

export default config;
