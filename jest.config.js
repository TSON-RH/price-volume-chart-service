// jest.config.js
module.exports = {
    verbose: true,
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "**/server/**",
        "**/database/**",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/client/dist/bundle.js",
        "!**/jest.config.js",
        "!**/coverage/lcov-report/**",
        "!**/webpack.config.js"
        
      ]
  };