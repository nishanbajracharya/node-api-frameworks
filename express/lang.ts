import express from 'express';
import language from './language.json';

interface Language {
  [key: string]: object;
}

const router = express.Router();

const error = {
  error: true,
  message: `Couldn't get language pack`,
};

router.get('/', async (_, res) => {
  try {
    res.json(language);
  } catch (_) {
    res.status(404).json(error);
  }
});

router.get('/:code', async (req, res) => {
  const code = req.params.code;

  try {
    const pack = (language as Language)[code];

    if (!pack) {
      throw new Error('No language pack');
    }

    res.json(pack);
  } catch (_) {
    res.status(404).json(error);
  }
});

export default router;
