const express = require('express');
const bodyParser = require('body-parser');
const db = require('./pgQueries');
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

//Get stock history by id
//Tested!
app.get('/api/volumes/symbols/:id', (req, res, next) => 
  db.getHistorybyID(req, res, next))

//add new stock history to existing stock
//Tested!
app.post('/api/volumes/symbols/:id', (req, res, next) => {
  db.addWeek(req, res, next);
});

//add a new stock
app.post('api/volumes/symbols/new', (req, res, next) => {
  db.addStock(req, res, next);
})


//update a stock
//Tested!
app.put('/api/volumes/symbols/:id', (req, res, next) => {
  db.updateStock(req, res, next);
});

//delete a stock by id
app.delete('/api/volumes/symbols/:id', (req, res, next) => {
  db.deleteStock(req, res, next);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
