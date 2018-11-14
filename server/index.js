const express = require('express');
const bodyParser = require('body-parser');
const PriceVolume = require('../database/PriceVolume.js');
const app = express();
const PORT = 3002;

//should update lastId with the last ID from the seeding script
let lastId = 100; 

app.use(express.static(__dirname+'/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//API Service
//get works!

app.get('/api/volumes/symbols/:id', (req, res, next) => {
  PriceVolume.find({id: req.params.id}, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    }
  })
})
//create new stock
//To do: fix the params so that it actually gets sent
// but I don't think it should with id in the url?
// how can I find the new id?
app.post('/api/volumes/symbols/new', (req, res, next) => {
  let params = {...req.body};
  lastId += 1; 
  params.id = lastId; 
  let newStock = new PriceVolume(params);
  newStock.save((err) => {
    if (err) {
      next(err);
    } else {
      console.log("New stock created with id ", params.id);
      res.status(201).end();
    }
  });
});

//update a stock -- this works!
app.put('/api/volumes/symbols/:id', (req, res, next) => {
  PriceVolume.findOneAndUpdate({id: req.params.id}, req.body, (err, doc) => {
    if (err) {
      next(err);
    } else {
      console.log("Successful update! ", doc)
      res.status(200).end();
    }
  })
});

//delete a stock by id
//this works!
app.delete('/api/volumes/symbols/:id', (req, res, next) => {
  PriceVolume.deleteOne({id: req.params.id}, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Delete successful!");
      res.status(200).end();
    }
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
