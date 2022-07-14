import Hapi from '@hapi/hapi';

import langPlugin from './lang';

const host = process.env.host || 'localhost';
const port = process.env.PORT || 3000;

async function init() {
  const server = Hapi.server({
    host,
    port,
  });

  await server.register({
    plugin: require('laabr'),
    options: {},
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        name: 'hapi-app',
        version: '1.0.0',
      };
    },
  });

  await server.register(langPlugin, {
    routes: {
      prefix: '/lang',
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
