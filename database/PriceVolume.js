var mongoose = require('mongoose');
var db = require('./index.js');
mongoose.Promise = global.Promise;

const priceVolumeSchema = new mongoose.Schema({
    symbol: String,
    name: String,
    prices: [Number],
    volumes: [Number],
    lowest: Number,
    heighest: Number,
    averagePrice: Number,
    currentPrice: Number
})

var PriceVolume = mongoose.model('PriceVolume', priceVolumeSchema);

module.exports = PriceVolume;