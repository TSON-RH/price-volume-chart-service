const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/price_volume_chart_service';

const db = mongoose.connect(mongoUri, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Successfully connected to database at ", mongoUri);
  }
});

module.exports = db;