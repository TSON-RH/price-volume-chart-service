const express = require('express');
const bodyParser = require('body-parser');
const PriceVolume = require('../database/PriceVolume.js');
const app = express();
const PORT = 3002;

app.use(express.static(__dirname+'/../client/dist'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/api/volumes/symbols/:symbolId', function(req, res){
  console.log(req.params.symbolId);
  //res.end(JSON.stringify(res.));
  PriceVolume.find({_id: req.params.symbolId}, (err, data)=>{
    if(err) console.log(err);
    console.log(data);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })


})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
