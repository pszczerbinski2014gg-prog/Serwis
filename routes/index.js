const express = require('express');
const router = express.Router();
const login = 'admin';
const password = 'admin';

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Logowanie' });
});

router.post('/login', function (req, res) {
  // Tutaj można dodać logikę uwierzytelniania użytkownika
  const body = req.body;

  if (body.username === login && body.password === password) {
    req.session.admin = 1;
    // Uwierzytelnianie udane
    console.log('Zalogowano pomyślnie!');
    res.redirect('/admin');
  } else {
    // Uwierzytelnianie nieudane
    // res.send('Nieprawidłowy login lub hasło.');
    console.log('Nieprawidłowy login lub hasło');
    res.redirect('/login');
  }

  console.log(req.body);
  res.redirect('/login');
});

module.exports = router;
