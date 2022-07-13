const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(express.json());
app.use(morgan('short'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    version: '1.0.0',
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log('Error', err);
    process.exit(1);
  }

  console.log('Listening on port', port);
});
