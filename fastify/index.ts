import fastify from 'fastify';

const server = fastify({ logger: true });

const port = process.env.PORT || 3000;

server.get('/', async () => {
  return {
    name: 'fastify-api',
    version: '1.0.0',
  };
});

server.register(require('./lang'), { prefix: '/lang' });

server.listen({ port: +port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
