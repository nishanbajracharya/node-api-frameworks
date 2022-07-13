import morgan from 'morgan';
import express, { Response } from 'express';

import langRouter from './lang';

const app = express();

app.use(express.json());
app.use(morgan('short'));

const port = process.env.PORT || 3000;

app.get('/', (_, res: Response) => {
  res.json({
    version: '1.0.0',
  });
});

app.use('/lang', langRouter);

app.listen(port, () => {
  console.log('Listening on port', port);
});
