import path from 'path';
import webpack from 'webpack';
import nodeLibsBrowser from 'node-libs-browser';

function clearObj(obj, exclude) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)  && !exclude.test(prop)) {
      delete obj[prop];
    }
  }
}

clearObj(nodeLibsBrowser, /^(process|contextify|buffer)$/);

export default {
  entry: {
    url: './node/lib/url.js',
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'commonjs2',
  },
  externals: /^(babel-runtime|buffer)(\/.*)?/,
  resolve: {
    modules: [path.join(__dirname, 'node/lib'), 'node_modules'],
    alias: {
      contextify: 'empty-module',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.binding': 'require',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['latest'],
          plugins: ['transform-runtime'],
        }
      }
    ]
  }
}
