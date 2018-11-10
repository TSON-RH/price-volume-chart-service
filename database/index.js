const mongoose = require('mongoose');
const mongoUri = 'mongodb://mongo:27017';

const db = mongoose.connect(mongoUri);

module.exports = db;