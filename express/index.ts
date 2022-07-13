import morgan from 'morgan';
import express, { Response } from 'express';

const app = express();

app.use(express.json());
app.use(morgan('short'));

const port = process.env.PORT || 3000;

app.get('/', (_, res: Response) => {
  res.json({
    version: '1.0.0',
  });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
