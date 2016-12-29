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

clearObj(nodeLibsBrowser, /^(process|buffer|vm)$/);

export default {
  entry: {
    url: './node/lib/url',
    util: './node/lib/util',
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'commonjs2',
  },
  externals: /^(babel-runtime|buffer|vm-browserify)(\/.*)?/,
  resolve: {
    modules: [path.join(__dirname, 'node/lib'), 'node_modules'],
    alias: {
      uv$: require.resolve('./fake-uv'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.binding': 'require',
      'process.release.name': JSON.stringify(process.release.name),
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
};
