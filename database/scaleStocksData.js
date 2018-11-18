const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const helper = require('./seed');

  //wrapper for csvWriter to handle backpressure
class Writer {
  constructor(file) {
    this.writer = csvWriter();
    this.writer.pipe(fs.createWriteStream(file))
  }

  write(obj) {
    if (!this.writer.write(obj)) {
      return new Promise(resolve => this.writer.once('drain', resolve))
    }
    return true;
  }
  
  end() {
    this.writer.end();
  }
}

(async() => {
  const writer = new Writer('./stocksInfo.csv');

  // for each new row
  for (let i = 0; i < 1e7; i += 1) {
    let min = parseFloat(faker.finance.amount(0.01, 10, 2));
    let max = parseFloat(faker.finance.amount(min, min + 100, 2));
    let avg = ((min + max) / 2).toFixed(2);
    let companySymbol = helper.getSymbol(i);
  
    let newRow = {
      id: i,
      symbol: companySymbol,
      lowest: min,
      highest: max,
      averagePrice: avg,
      currentPrice: faker.finance.amount(min, max, 2)
    }

    // write row to csv
    const res = writer.write(newRow);

    if (res instanceof Promise) {
      await res;
    }
  }
  writer.end();
})();

