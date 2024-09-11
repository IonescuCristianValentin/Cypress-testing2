const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 12000,
  env: {
    url: "https://www.pvcmag.ro/"
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: "cypress/integration/examples/*.js",
    
  },
});
