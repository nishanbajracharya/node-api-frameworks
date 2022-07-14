import { FastifyInstance, RouteOptions, HookHandlerDoneFunction } from 'fastify';

import language from './language.json';

type RequestParam = {
  code: string;
};

interface Language {
  [key: string]: object;
}

const error = {
  error: true,
  message: `Couldn't get language pack`,
};

export default function (fastify: FastifyInstance, opts: RouteOptions, done: HookHandlerDoneFunction) {
  fastify.get('/', (_, reply) => {
    if (!language) {
      return reply.code(404).send(error);
    }
    reply.code(200).send(language);
  });

  fastify.get('/:code', (request, reply) => {
    const { code } = request.params as RequestParam;

    if (!language) {
      return reply.code(404).send(error);
    }

    const pack = (language as Language)[code];
    if (!pack) {
      return reply.code(404).send(error);
    }

    reply.code(200).send(pack);
  });

  done();
}
