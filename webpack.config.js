const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  target: "node", // Specify target environment as node
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Keep single output file for backend
    libraryTarget: "commonjs2",
    clean: true, // Clean the dist folder before each build
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // Add alias resolution for webpack if needed, matching tsconfig
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // Specify your tsconfig.json file
            configFile: path.resolve(__dirname, "tsconfig.json"),
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
            dead_code: true,
            unused: true,
          },
          mangle: true,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    // Removed splitChunks configuration for backend bundling
  },
  externals: {
    // Keep externalizing node modules for backend
    // Ensure these are listed in package.json dependencies
    "ethers": "commonjs ethers",
    "express": "commonjs express",
    "mongoose": "commonjs mongoose",
    "ioredis": "commonjs ioredis",
    "jsonwebtoken": "commonjs jsonwebtoken",
    "bcrypt": "commonjs bcrypt",
    "winston": "commonjs winston",
    "cors": "commonjs cors",
    "dotenv": "commonjs dotenv",
    // React is likely not needed for the backend bundle, consider removing if unused
    // 'react': 'commonjs react',
    // 'react-dom': 'commonjs react-dom',
  },
  // Add node specific settings
  node: {
    __dirname: false, // Keep __dirname behavior
    __filename: false, // Keep __filename behavior
  },
  devtool: "source-map", // Add source maps for easier debugging
};

