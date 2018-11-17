const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writer = csvWriter(
  {sendHeaders: false}
  );

const csvStream = fs.createWriteStream('./stockHistory.csv',
 {flags: 'a'}
 );
writer.pipe(csvStream);

const chunk = 1e6;
  
// for each stock
for (let i = chunk*8; i < chunk*10; i += 1) {
  //create 30 weeks for each stock
  for (let week = 5; week < 10; week += 1) {
    let price = parseFloat(faker.finance.amount(0.01, 110, 2));
    let volume = Math.round(Math.random()*100);

    // make the row
    let newRow = {
      id: i,
      week: week,
      price: price,
      volume: volume,
    }
    // write row to csv
    writer.write(newRow);
    }
  }
  
  writer.end();
