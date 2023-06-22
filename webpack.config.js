const path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(?:js|mjs|cjs|jsx)$/,
      // test: /\.(?:js*)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', ['@babel/preset-react', { "runtime": "automatic" }]]
        }
      }
    }, {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    }]
  },
  mode: 'development',
  devServer: {
    static: './public',
    historyApiFallback: true
  }
};