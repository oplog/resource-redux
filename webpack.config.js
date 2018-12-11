const path = require("path");

const isProdMode = (argv) => argv.mode === "production";

const sourceMapRule = (argv) => {
  if (isProdMode(argv)) {
    return {
      test: /\.(js|ts|tsx)$/,
      use: ["source-map-loader"],
      enforce: "pre"
    };
  }

  return {};
}

module.exports = (env, argv) => ({
  entry: "./src/index.ts",
  devtool: !isProdMode(argv) ? "cheap-module-eval-source-map" : false,
  plugins: [],
  module: {
    rules: [
      sourceMapRule(argv),
      {
        test: /\.ts$/,
        enforce: "pre",
        use: [
          {
            loader: "tslint-loader",
            options: {
              failOnHint: isProdMode(argv),
              fix: !isProdMode(argv)
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "@oplog/resource-redux",
    libraryTarget: "umd"
  },
  externals: {
    redux: "redux",
    "redux-saga": "redux-saga"
  },
  watch: false,
  watchOptions: {
    ignored: /dist/,
    aggregateTimeout: 1000 // The default
  }
});
