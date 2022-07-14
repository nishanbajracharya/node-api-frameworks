import Koa from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger';

import langRouter from './lang';

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;

router.get('/', (ctx) => {
  ctx.body = {
    name: 'koa-api',
    version: '1.0.0',
  };
});

router.use('/lang', langRouter.routes(), langRouter.allowedMethods());

app.use(logger()).use(router.routes()).use(router.allowedMethods()).listen(port, () => {
  console.log('Listening on port', port);
});
