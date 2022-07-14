import Router from 'koa-router';

import language from './language.json';

const router = new Router();

interface Language {
  [key: string]: object;
}

const error = {
  error: true,
  message: `Couldn't get language pack`,
};

router
  .get('/', (ctx) => {
    if (!language) {
      ctx.status = 404;
      ctx.body = error;

      return;
    }

    ctx.body = language;
  })
  .get('/:code', (ctx) => {
    if (!language) {
      ctx.status = 404;
      ctx.body = error;

      return;
    }

    const code = ctx.params.code;
    const pack = (language as Language)[code];

    if (!pack) {
      ctx.status = 404;
      ctx.body = error;

      return;
    }

    ctx.body = pack;
  });

export default router;
