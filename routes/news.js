var express = require('express');
var router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const search = req.query.search || '';
    const newsList = await News.find({
      title: new RegExp(search.trim(), 'i'),
    }).sort({
      created: -1,
    });
    res.render('news', { title: 'News', data: newsList, search });
  } catch (err) {
    console.log('❌ Błąd pobierania newsów:', err);
    res.render('news', { title: 'News', data: [] });
  }
});

module.exports = router;
