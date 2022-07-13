import express from 'express';
import { readFile } from 'node:fs/promises';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lang = await readFile('./language.json', { encoding: 'utf-8' });
    const json = JSON.parse(lang);

    res.json(json);
  } catch (_) {
    res.status(404).json({
      error: true,
      message: `Couldn't get language pack`,
    });
  }
});

router.get('/:code', async (req, res) => {
  const code = req.params.code;

  try {
    const lang = await readFile('./language.json', { encoding: 'utf-8' });
    const json = JSON.parse(lang);

    const pack = json[code];

    if (!pack) {
      throw new Error('No language pack');
    }

    res.json(pack);
  } catch (_) {
    res.status(404).json({
      error: true,
      message: `Couldn't get language pack`,
    });
  }
});

export default router;
