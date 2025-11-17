var express = require('express');
var router = express.Router();
const Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const show = !req.session.vote;
    const data = await Quiz.find({});

    let sum = 0;
    data.forEach((quiz) => {
      sum += quiz.vote;
    });

    res.render('quiz', { title: 'Quiz', data, show, sum });
  } catch (err) {
    console.log('❌ Błąd pobierania quizów:', err);
    res.render('quiz', { title: 'Quiz', data: [], show: true, sum: 0 });
  }
});

router.post('/', async function (req, res) {
  try {
    const id = req.body.quiz;
    if (!id) return res.redirect('/quiz');

    const updated = await Quiz.findByIdAndUpdate(
      id,
      { $inc: { vote: 1 } },
      { new: true }
    );

    if (!updated) {
      console.log(`❌ Nie znaleziono quizu id=${id}`);
    } else {
      console.log(`✅ Głos zapisany dla quiz id=${id}`);
      req.session.vote = 1;
    }

    return res.redirect('/quiz');
  } catch (err) {
    console.log('❌ Błąd przetwarzania głosu:', err);
    return res.redirect('/quiz');
  }
});

module.exports = router;
