// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  retries: {
    runMode: 2,
  },
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, global-require
      require('@cypress/code-coverage/task')(on, config);
      return config
    },
    baseUrl: `http://localhost:${process.env.PORT}`,
  }
})
