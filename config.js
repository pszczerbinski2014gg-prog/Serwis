require('dotenv').config();

module.exports = {
    db: process.env.DB_KEY,
    keySession: ['TwojSekretnyKlucz1'],
    maxAgeSession: 24 * 60 * 60 * 1000 // 24 hours
}