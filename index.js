'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiReactViews = require('hapi-react-views');
const DocMeta = require('react-doc-meta');
const routes = require('./lib/routes');

require('babel-core/register')({
    presets: ['react', 'es2015']
});

const server = new Hapi.Server({
  connections: {
      routes: {
          files: {
              relativeTo: Path.join(__dirname, './assets')
          }
      }
  }
});

server.connection({
    host: 'localhost',
    port: 3000
});

let options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: 'good-http',
        events: { error: '*' },
        config: {
            endpoint: 'http://prod.logs:3000'
        }
    }]
};

server.register([Inert, Vision, {register: require('good'), options: options}], (err) => {

    if (err) {
        console.log('Failed to load plugins.');
    }

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: ['components/home', 'components/layout']
    });

    server.route({
          method: 'GET',
          path: '/',
          handler: (request, reply) => {

              // Temporary bug fix for material ui ssr
              GLOBAL.navigator = {
                  userAgent: request.headers['user-agent']
              };

              const appContext = {
                  name: 'The Server!',
                  title: 'Home'
              };

              const renderOpts = {
                  runtimeOptions: {
                      renderMethod: 'renderToString'
                  }
              };

              server.render('home', appContext, renderOpts, (err, appOutput) => {

                if (err) {
                    return reply(err);
                }

                  const htmlContext = {
                      remount: appOutput,
                      state: 'window.state = ' + JSON.stringify(appContext) + ';',
                      title: 'home',
                      tags: [
                        {name: "description", content: "lorem ipsum dolor"},
                        {itemProp: "name", content: "The Name or Title Here"},
                        {itemProp: "description", content: "This is the page description"},
                        {itemProp: "image", content: "http://www.example.com/image.jpg"},
                        {name: "twitter:card", content: "product"},
                        {name: "twitter:site", content: "@publisher_handle"},
                        {name: "twitter:title", content: "Page Title"},
                        {name: "twitter:description", content: "Page description less than 200 characters"},
                        {name: "twitter:creator", content: "@author_handle"},
                        {name: "twitter:image", content: "http://www.example.com/image.html"},
                        {name: "twitter:data1", content: "$3"},
                        {name: "twitter:label1", content: "Price"},
                        {name: "twitter:data2", content: "Black"},
                        {name: "twitter:label2", content: "Color"},
                        {property: "og:title", content: "Title Here"},
                        {property: "og:type", content: "article"},
                        {property: "og:url", content: "http://www.example.com/"},
                        {property: "og:image", content: "http://example.com/image.jpg"},
                        {property: "og:description", content: "Description Here"},
                        {property: "og:site_name", content: "Site Name, i.e. Moz"},
                        {property: "og:price:amount", content: "15.00"},
                        {property: "og:price:currency", content: "USD"},
                        {rel: "stylesheet", type: "text/css", href: "/assets/layout/layout.css"},
                        {rel: "stylesheet", type: "text/css", href: "/assets/home/home.css"}
                      ]
                  };

                  server.render('layout', htmlContext, (err, htmlOutput) => {
                      if (err) {
                          return reply(err);
                      };
                      reply(htmlOutput);
                  });
              });
          }
      });

    server.route(routes);

    server.start((err) => {

        if (err) {
          throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});
