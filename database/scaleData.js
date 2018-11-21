const fs = require('fs');
const faker = require('faker');
const helper = require('./seed');

(async() => {
  const writeStream = fs.createWriteStream('./mongoData2.json');

  for (let i = 5e6; i < 1e7; i += 1) {
    let min = parseFloat(faker.finance.amount(0.01, 10, 2));
    let max = parseFloat(faker.finance.amount(min, min + 100, 2));
    let pricesArr = helper.generateUniformRange(min, max);
    let volumeArr = helper.getRandomHeights();
    let avg = ((min + max) / 2).toFixed(2);
    let companySymbol = helper.getSymbol(i);
  
    // make the row
    let newRow = {
      id: i,
      symbol: companySymbol,
      prices: pricesArr,
      volumes: volumeArr,
      lowest: min,
      highest: max,
      averagePrice: avg,
      currentPrice: faker.finance.amount(min, max, 2)
    }
    let row = JSON.stringify(newRow, null, 2);
    // write row to json file
    const res = writeStream.write(row);

    if (res instanceof Promise) {
      await res;
    }
  }
  writeStream.end();
})();


