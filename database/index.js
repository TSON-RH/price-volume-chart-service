const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/price_volume_chart_service';

const db = mongoose.connect(mongoUri);

module.exports = db;