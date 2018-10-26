const db = require('./index.js');
const PriceVolume = require('./PriceVolume.js');
const faker = require('faker');

const randomData = [];

//Generate a array of numbers uniformly distant into 30 numbers for a given range.
const generateUniformRange = function(min, max){
    let diff = (max-min)/30;
	let res = [];
	for(let i = 0; i <30; i++){
		res.push(+(min+diff*i).toFixed(2));
	}
	return res;
}

//Generate 30 random volumes for bar graph.
const getRandomHeights = function(){
    let res= [];
    for(let i = 0; i <30; i++){
		res.push(Math.round(Math.random()*100));
	}
	return res;
}

//Get Average price of randomly generated data
const getAverage = function(pArr, vArr){
    let total = 0;
    for(let i = 0; i<30;i++){
        total+=pArr[i]*vArr[i];
    }
    return total/(vArr.reduce((accum,x)=>{return accum+x}));
}
//Create 100 rows of data
for(let i = 0; i <100; i++){
    let min = parseFloat(faker.finance.amount(0.01, 10, 2));
    let max = parseFloat(faker.finance.amount(min, min+100, 2));
    let pricesArr = generateUniformRange(min, max);
    let volumeArr = getRandomHeights();
    let avg = getAverage(pricesArr, volumeArr);
    let companyName = faker.company.companyName(0);
    let companySymbol = companyName.toUpperCase();

    let newData = {
        symbol: companySymbol,
        name: companyName,
        prices: pricesArr,
        volumes: volumeArr,
        lowest: min,
        heighest: max,
        averagePrice: avg,
        currentPrice: faker.finance.amount(min, max, 2)
    }
    randomData.push(newData);
}

//Insert into database
const insertSamplePriceVolumes = function() {
    PriceVolume.create(randomData)
      .then(() => db.disconnect());
  };
  
insertSamplePriceVolumes();