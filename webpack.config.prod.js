var path = require('path');
var poststylus = require('poststylus');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');


module.exports = {
    entry: {
      home: path.join(__dirname, './components/home.jsx'),
      graphql: path.join(__dirname, './components/Graphiql.jsx')
    },
    output: {
      path: path.join(__dirname, 'assets'),
      filename: '/[name]/[name].min.js',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
          minimize: true
      }),
      new ExtractTextPlugin("/[name]/[name].min.css")
    ],
    resolve: {
      extensions: ['', '.jsx', '.js', 'styl'],
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: ['./build/babelRelayPlugin']
            }
        },
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
        }
      ]
    },
    stylus: {
      use: [poststylus('rucksack-css')]
    }
};
