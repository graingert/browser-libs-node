import path from 'path';
import webpack from 'webpack';

export default {
  entry: {
    url: './node/lib/url.js',
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: [path.join(__dirname, 'node/lib')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.binding': 'require',
    }),
  ],
}
