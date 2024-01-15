// eslint-disable-next-line import/no-extraneous-dependencies
import setupCodeCoverage from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  retries: {
    runMode: 2,
  },
  chromeWebSecurity: false,
  e2e: {
    env: {
      API_HOST: process.env.VITE_GRAASP_API_HOST,
      ENABLE_MOCK_API: process.env.VITE_GRAASP_ENABLE_MOCK_API,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      setupCodeCoverage(on, config);
      return config;
    },
    baseUrl: `http://localhost:${process.env.VITE_PORT}`,
  },
});
