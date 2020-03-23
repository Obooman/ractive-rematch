module.exports = {
  transform: { "\\.js|ts$": ["babel-jest", { rootMode: "upward" }] },
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./test-report/report.html"
      }
    ]
  ]
};
