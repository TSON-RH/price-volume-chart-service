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
app.get('/api/volumes/symbols/:id', (req, res) => {
  PriceVolume.find({id: req.params.id}, (err, data) => {
    if (err) {
      return handleError(err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    }
  })
})
//create new stock
app.post('/api/volumes/symbols/:id', (req, res) => {
  let newStock = new PriceVolume({ ...req.params });
  newStock.save((err, doc) => {
    if (err) {
      return handleError(err);
    } else {
      console.log("New stock created: ", doc);
      res.status(201).end();
    }
  });
});

//update a stock
app.put('/api/volumes/symbols/:id', (req, res) => {
  PriceVolume.findOneAndUpdate({id: req.params.id}, {...req.params}, (err, doc) => {
    if (err) {
      return handleError(err);
    } else {
      console.log("Successful update! ", doc)
      res.status(200).end();
    }
  })
});

//delete a stock by id
app.delete('/api/volumes/symbols/:id', (req, res) => {
  PriceVolume.findOneAndRemove(req.params.id, (err) => {
    if (err) {
      return handleError(err);
    } else {
      console.log("Delete successful!");
      res.status(200).end();
    }
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
