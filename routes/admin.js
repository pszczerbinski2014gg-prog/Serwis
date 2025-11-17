var express = require('express');
var News = require('../models/news');
var router = express.Router();

// ...existing code...

router.all('*', function (req, res, next) {
  if (!req.session.admin) {
    res.redirect('login');
    return;
  }
  next();
});

router.get('/', async function (req, res) {
  try {
    const data = await News.find({});
    console.log(data);
    res.render('admin/index', { title: 'Admin', data });
  } catch (err) {
    console.log('❌ Błąd pobierania newsów:', err);
    res.render('admin/index', { title: 'Admin', data: [] });
  }
});

router.get('/news/add', function (req, res) {
  res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} });
});

router.post('/news/add', async function (req, res) {
  const body = req.body;

  const newsData = new News({
    title: body.title,
    description: body.description,
  });

  const errors = newsData.validateSync();
  if (errors) {
    return res.render('admin/news-form', {
      title: 'Dodaj news',
      errors,
      body,
    });
  }

  try {
    await newsData.save();
    console.log('✅ News zapisany');
    return res.redirect('/admin');
  } catch (err) {
    console.log('❌ Błąd zapisu:', err);
    return res.render('admin/news-form', {
      title: 'Dodaj news',
      error: 'Wystąpił błąd podczas zapisu do bazy',
      body,
    });
  }
});

router.get('/news/delete/:id', async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.redirect('/admin');

    await News.findByIdAndDelete(id);
    console.log(`✅ Usunięto news id=${id}`);
    return res.redirect('/admin');
  } catch (err) {
    console.log('❌ Błąd usuwania newsa:', err);
    return res.render('admin/index', { title: 'Admin', data: [] });
  }
});

module.exports = router;
