const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/template.html',
    }),
  ],
};
