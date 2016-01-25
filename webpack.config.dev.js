var path = require('path');
var poststylus = require('poststylus');
var webpack = require('webpack');


module.exports = {
    entry: {
      home: path.join(__dirname, './components/home.jsx'),
      graphql: path.join(__dirname, './components/Graphiql.jsx')
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
      path: path.join(__dirname, 'assets'),
      filename: '/[name]/[name].js',
      publicPath: '/static/'
    },
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
          loader: 'style-loader!css-loader!stylus-loader'
        }
      ]
    },
    stylus: {
      use: [poststylus('rucksack-css')]
    }
};
