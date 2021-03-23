const path = require('path');

console.log(process.env.NODE_ENV)

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 2021,
    publicPath: '/',
    hotOnly: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      "~": path.resolve(__dirname, 'src'),
      "@": path.resolve(__dirname, 'public')
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(scss|css)$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
    }, {
      test: /\.svg$/,
      loader: 'file-loader'
    }]
  }
}