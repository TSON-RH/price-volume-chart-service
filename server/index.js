const express = require('express');
const bodyParser = require('body-parser');
const PriceVolume = require('../database/PriceVolume.js');
const app = express();
const PORT = 3002;

app.use(express.static(__dirname+'/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//API Service
app.get('/api/volumes/symbols/:id', function(req, res){
  PriceVolume.find({id: req.params.id}, (err, data)=>{
    if(err) console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })
})
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
