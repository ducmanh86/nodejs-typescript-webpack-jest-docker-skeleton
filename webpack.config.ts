// tslint:disable-next-line:no-implicit-dependencies
import * as webpack from 'webpack'

const path = require('path')

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  stats: {
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
}

export default config
