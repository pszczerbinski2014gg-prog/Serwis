// ...existing code...
var express = require('express');
var router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const search = req.query.search || '';
    let sort = req.query.sort || defaultSort;

    // Konwertuj sort na liczbę i sprawdź czy to 1 lub -1
    sort = parseInt(sort);
    if (sort !== 1 && sort !== -1) {
      sort = defaultSort;
    }

    const newsList = await News.find({
      title: new RegExp(search.trim(), 'i'),
    }).sort({
      created: sort,
    }).select('_id title description ');

    res.json({ success: true, data: newsList, search });
  } catch (err) {
    console.log('❌ Błąd pobierania newsów:', err);
    res.status(500).json({ success: false, data: [], error: err.message });
  }
});

router.get('/:id', async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Brak ID' });
    }

    const findNews = await News.findById(id).select('_id title description ');

    if (!findNews) {
      return res.status(404).json({ success: false, error: 'News nie znaleziony' });
    }

    res.json({ success: true, data: findNews });
  } catch (err) {
    console.log('❌ Błąd pobierania newsów:', err);
    res.status(500).json({ success: false, data: [], error: err.message });
  }
});

// ...existing code...
module.exports = router;