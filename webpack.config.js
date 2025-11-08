const path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  externals: {
    express: "commonjs express",
  },
  mode: "production",
  module: {
    rules: [],
  },
};
