const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);

//connect to db
const port = 5432; 
const dbName = 'price_volume'
const dbConnection = `postgres://postgres:yukipostgres@localhost:${port}/${dbName}`;
const db = pgp(dbConnection);

//Read queries
//To do: add in code to reformat returned data to right shape
function getHistorybyID(req, res, next) {
  //get out by ID
  db.any(`SELECT id, symbol, lowest, highest, average_price, current_price, week, price, volume 
    FROM stock_info INNER JOIN stock_history
    ON (stock_info.id=stock_history.stock_id)
    WHERE 
    id = $1
    AND (week >= 1)`, 
    [req.params.id])
    .then((data) => {
      let finalData = {};
      finalData.lowest = parseFloat(data[0].lowest);
      finalData.highest = parseFloat(data[0].highest);
      finalData.averagePrice = parseFloat(data[0].average_price);
      finalData.currentPrice = parseFloat(data[0].current_price);
      finalData.prices = data.map((row) => {return parseFloat(row.price)});
      finalData.volumes = data.map((row) => {return parseInt(row.volume)});
      res.status(200).json([finalData])
    })
    .catch(err => {
      return next(err);
    })
}

function getHistorybySymbol(req, res, next) {
  //get out by ID
  db.any(`SELECT id, symbol, lowest, highest, average_price, current_price, week, price, volume 
    FROM stock_info INNER JOIN stock_history
    ON (stock_info.id=stock_history.stock_id)
    WHERE 
    symbol = $1
    AND (week >= 1)`, 
    [req.body.symbol])
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(err => {
      return next(err);
    })
}

//Put -- update a stock

function updateStock(req, res, next) {
  db.none('update stock_info SET lowest = $1, highest = $2, average_price = $3, current_price = $4 WHERE id=$5',
  [req.body.lowest, req.body.highest, req.body.average, req.body.current, req.params.id])
    .then(() => {
      res.status(200).json({
        status: 'Success',
        message: 'Updated stock info'
      });
    })
    .catch(err => {
      return next(err);
    });
}

//Post -- add stock history or new stock
function addWeek(req, res, next) {
  const id = req.params.id;
  const week = req.body.week;
  const price = req.body.price;
  const volume = req.body.volume;
  db.none(`INSERT INTO stock_history VALUES(${id}, ${week}, ${price}, ${volume})`)
    .then(() => {
      res.status(200).json({
        status: 'Success',
        message: 'Added stock history'
      });
    })
    .catch(err => {
      return next(err);
    });
}

function addStock(req, res, next) {
  const id = req.body.id;  
  const symbol = req.body.symbol;
  const lowest = req.body.lowest;
  const highest = req.body.highest;
  const average = req.body.average;
  const current = req.body.current;

  db.none(`INSERT INTO stock_info VALUES
  (${id}, ${symbol}, ${lowest}, ${highest}, ${average}, ${current})`)
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'Added new stock'
    });
  })
  .catch(err => {
    return next(err);
  });
}

//Delete a stock

function deleteStock(req, res, next) {
  db.result(`DELETE FROM stock_info WHERE id = $1`, [req.params.id])
    .then(result => {
      res.status(200).json({
        status: 'Success',
        message: `Removed ${result.rowCount} stock` 
      })
    })
    .catch(err => {
      return next(err);
    })
}



//Checking database connection
db.connect()
  .then(obj => {
    console.log("Success connecting to postgres db!")
    obj.done();
  })
  .catch(err => {
    console.log("error connecting to db :(")
  })

module.exports = {
  getHistorybyID: getHistorybyID,
  getHistorybySymbol: getHistorybySymbol,
  updateStock, updateStock,
  addWeek: addWeek,
  addStock: addStock,
  deleteStock: deleteStock
};