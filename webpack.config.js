const path = require('path');
const poststylus = require('poststylus');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
      layout: path.join(__dirname, './components/layout/layout.jsx'),
      home: path.join(__dirname, './components/home.jsx')
    },
    output: {
        filename: path.join(__dirname, './assets/[name]/[name].js')
    },
    resolve: {
      extensions: ['', '.jsx', '.js', 'styl'],
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015', 'stage-0']
            }
        },
        {
          test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
        }
      ]
    },
    stylus: {
      use: [poststylus('rucksack-css')]
    },
    plugins: [
        new ExtractTextPlugin("assets/[name]/[name].css")
    ]
};
