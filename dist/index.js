require('babel-core/register')({
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-runtime']
});

import 'babel-polyfill';

import Path from 'path';
import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiReactViews from 'hapi-react-views';
import DocMeta from 'react-doc-meta';
import routes from './routes';
import Boom from 'boom';
import Tv from 'tv';
import GraphQL from 'hapi-graphql';

const server = new Hapi.Server({
    debug: { request: ['error'] },
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../assets')
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

import Schema from './schema';

server.register([{
    register: require('good'),
    options: options
}, {
    register: GraphQL,
    options: {
        query: (request, response) => ({
            schema: Schema,
            rootValue: {},
            pretty: true
        }),
        route: {
            path: '/graphql',
            config: {}
        }
    }
}, Inert, Vision, {
    register: Tv,
    options: tvOptions
}], err => {

    if (err) {
        console.log(err + 'Failed to load plugins.');
    }

    server.views({
        engines: {
            ejs: require('ejs')
        },
        relativeTo: __dirname,
        path: ['../views']
    });

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.view('index', {
                title: 'home',
                message: 'Hello World!'
            });
        }
    });

    if (process.env.NODE_ENV === 'development') {
        server.route({
            method: 'GET',
            path: '/graphiql',
            handler: (request, reply) => {
                reply.view('graphiql', {
                    title: 'graphql'
                });
            }
        });
    }

    server.start(err => {

        if (err) {
            throw err;
        }
        console.log('--------------------------------------------------------------------------------');
        console.log('😀  Server is listening at ' + server.info.uri);
        console.log('--------------------------------------------------------------------------------');
    });
});