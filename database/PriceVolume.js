const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const connection = mongoose.createConnection("mongodb://localhost/price_volume_chart_service");
autoIncrement.initialize(connection);

const priceVolumeSchema = new mongoose.Schema({
    symbol: String,
    name: String,
    prices: [Number],
    volumes: [Number],
    lowest: Number,
    highest: Number,
    averagePrice: Number,
    currentPrice: Number
})

priceVolumeSchema.plugin(autoIncrement.plugin, {
    model: 'PriceVolume',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});
const PriceVolume = mongoose.model('PriceVolume', priceVolumeSchema);

module.exports = PriceVolume;