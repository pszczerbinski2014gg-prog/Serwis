require('dotenv').config();

module.exports = {
  db: process.env.DB_KEY,
  keySession: ['TwojSekretnyKlucz1'],
  maxAgeSession: 1 * 60 * 1000, // 1min
};
