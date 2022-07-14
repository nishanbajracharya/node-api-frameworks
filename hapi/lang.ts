import Boom from '@hapi/boom';
import { ServerRoute, Server, Plugin } from '@hapi/hapi';

import language from './language.json';

interface Language {
  [key: string]: object;
}

const error = {
  error: true,
  message: `Couldn't get language pack`,
};

const getLanguage: ServerRoute = {
  method: 'GET',
  path: '/',
  handler: () => {
    if (!language) {
      return Boom.notFound(error.message);
    }

    return language;
  },
};

const getLanguageByCode: ServerRoute = {
  method: 'GET',
  path: '/{code}',
  handler: (request, h) => {
    const code = request.params.code;

    if (!language) {
      return Boom.notFound(error.message);
    }

    const pack = (language as Language)[code];

    if (!pack) {
      return Boom.notFound(error.message);
    }

    return pack;
  },
};

const plugin: Plugin<any> = {
  name: 'Language Plugin',
  register: (server: Server) => {
    server.route([getLanguage, getLanguageByCode]);
  },
};

export default plugin;
