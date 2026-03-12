const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  reporter: [["html", { outputFolder: "my-report" }]],
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    video: "on",
    screenshot: "on",
  },
});
