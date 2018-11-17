const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const helper = require('./seed');

const writer = csvWriter(
  // {sendHeaders: false}
  );
const csvStream = fs.createWriteStream('./stockData.csv',
 {flags: 'a'}
 );
writer.pipe(csvStream);

const chunk = 5e6;
// for each new row
for (let i = chunk; i < chunk*2; i += 1) {
  let min = parseFloat(faker.finance.amount(0.01, 10, 2));
  let max = parseFloat(faker.finance.amount(min, min + 100, 2));
  let avg = (min + max) / 2;
  let companySymbol = helper.getSymbol(i);

  // make the row
  let newRow = {
    id: i,
    symbol: companySymbol,
    lowest: min,
    highest: max,
    averagePrice: avg,
    currentPrice: faker.finance.amount(min, max, 2)
  }

  // write row to csv
  writer.write(newRow);
  }

  writer.end();
