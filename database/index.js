const mongoose = require('mongoose');
const mongoUri = 'mongodb://admin:abcd1234@ds157853.mlab.com:57853/price_volume_chart_service';

const db = mongoose.connect(mongoUri);

module.exports = db;