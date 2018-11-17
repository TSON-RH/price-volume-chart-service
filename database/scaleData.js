const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const helper = require('./seed');
// const through2 = require('through2');

const writer = csvWriter();
const csvStream = fs.createWriteStream('./testData.csv', {flags: 'a'});
writer.pipe(csvStream);
  
// for each new row
for (let i = 0; i < 1e6; i += 1) {
  let min = parseFloat(faker.finance.amount(0.01, 10, 2));
  let max = parseFloat(faker.finance.amount(min, min + 100, 2));
  let pricesArr = helper.generateUniformRange(min, max);
  let volumeArr = helper.getRandomHeights();
  // let avg = helper.getAverage(pricesArr, volumeArr);
  let avg = (min + max) / 2;
  // let companyName = faker.company.companyName(0);
  let companySymbol = helper.getSymbol(i);

  // make the row
  let newRow = {
    id: i,
    symbol: companySymbol,
    // name: companyName,
    prices: pricesArr,
    volumes: volumeArr,
    lowest: min,
    highest: max,
    averagePrice: avg,
    currentPrice: faker.finance.amount(min, max, 2)
  }

  // write row to csv
  writer.write(newRow);
  }

  writer.end();



