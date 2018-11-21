const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

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
  const writer = new Writer('./stockHistory.csv');

  // for each stock
  for (let i = 0; i < 1e7; i += 1) {
    //create 10 weeks for each stock
    for (let week = 1; week < 10; week += 1) {
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
      const res = writer.write(newRow);

      if (res instanceof Promise) {
        await res;
      }
    }    
  }
  writer.end();
})();
