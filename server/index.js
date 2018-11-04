const express = require('express');
const bodyParser = require('body-parser');
const PriceVolume = require('../database/PriceVolume.js');
const app = express();
const PORT = 3002;

app.use(express.static(__dirname+'/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/volumes/symbols/:symbolId', function(req, res){
  console.log('req.params:',req.params);
  PriceVolume.find({id: req.params.symbolId}, (err, data)=>{
    if(err) console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })
})
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
