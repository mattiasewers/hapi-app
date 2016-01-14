'use strict';

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _graffiti = require('@risingstack/graffiti');

var _graffiti2 = _interopRequireDefault(_graffiti);

var _graffitiMongoose = require('@risingstack/graffiti-mongoose');

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _hapiReactViews = require('hapi-react-views');

var _hapiReactViews2 = _interopRequireDefault(_hapiReactViews);

var _reactDocMeta = require('react-doc-meta');

var _reactDocMeta2 = _interopRequireDefault(_reactDocMeta);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _tv = require('tv');

var _tv2 = _interopRequireDefault(_tv);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-core/register')({
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-runtime']
});

var server = new _hapi2.default.Server({
    debug: { request: ['error'] },
    connections: {
        routes: {
            files: {
                relativeTo: _path2.default.join(__dirname, '../assets')
            }
        }
    }
});

server.connection({
    host: 'localhost',
    port: 3000
});

var tvOptions = {
    endpoint: '/debug/console'
};

var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './test/fixtures/awesome_log'
    }, {
        reporter: 'good-http',
        events: { error: '*' },
        config: {
            endpoint: 'http://prod.logs:3000',
            wreck: {
                headers: { 'x-api-key': 12345 }
            }
        }
    }]
};

server.register([{
    register: require('good'),
    options: options
}, _inert2.default, _vision2.default, {
    register: _tv2.default,
    options: tvOptions
}], function (err) {

    if (err) {
        console.log(err + 'Failed to load plugins.');
    }

    server.views({
        engines: {
            jsx: _hapiReactViews2.default
        },
        relativeTo: __dirname,
        path: ['../components/home', '../components/layout']
    });

    server.route(_routes2.default);

    server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {

            // Temporary bug fix for material ui ssr
            GLOBAL.navigator = {
                userAgent: request.headers['user-agent']
            };

            var appContext = {
                name: 'The Server!',
                title: 'Home'
            };

            var renderOpts = {
                runtimeOptions: {
                    renderMethod: 'renderToString'
                }
            };

            server.render('home', appContext, renderOpts, function (err, appOutput) {

                if (err) {
                    return reply(err + 'get home');
                }

                var htmlContext = {
                    remount: appOutput,
                    state: 'window.state = ' + JSON.stringify(appContext) + ';',
                    title: 'home',
                    tags: [{ name: "description", content: "lorem ipsum dolor" }, { itemProp: "name", content: "The Name or Title Here" }, { itemProp: "description", content: "This is the page description" }, { itemProp: "image", content: "http://www.example.com/image.jpg" }, { name: "twitter:card", content: "product" }, { name: "twitter:site", content: "@publisher_handle" }, { name: "twitter:title", content: "Page Title" }, { name: "twitter:description", content: "Page description less than 200 characters" }, { name: "twitter:creator", content: "@author_handle" }, { name: "twitter:image", content: "http://www.example.com/image.html" }, { name: "twitter:data1", content: "$3" }, { name: "twitter:label1", content: "Price" }, { name: "twitter:data2", content: "Black" }, { name: "twitter:label2", content: "Color" }, { property: "og:title", content: "Title Here" }, { property: "og:type", content: "article" }, { property: "og:url", content: "http://www.example.com/" }, { property: "og:image", content: "http://example.com/image.jpg" }, { property: "og:description", content: "Description Here" }, { property: "og:site_name", content: "Site Name, i.e. Moz" }, { property: "og:price:amount", content: "15.00" }, { property: "og:price:currency", content: "USD" }, { rel: "stylesheet", type: "text/css", href: "/assets/layout/layout.css" }, { rel: "stylesheet", type: "text/css", href: "/assets/home/home.css" }]
                };

                server.render('layout', htmlContext, function (err, htmlOutput) {
                    if (err) {
                        return reply(err + 'render home');
                    };
                    reply(htmlOutput);
                });
            });
        }
    });

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});