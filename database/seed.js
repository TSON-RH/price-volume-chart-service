const db = require('./index.js');
const PriceVolume = require('./PriceVolume.js');
var faker = require('faker');

const randomData = [];

//Generate a array of numbers uniformly distant into 30 numbers for a given range.
var generateUniformRange = function(min, max){
    var diff = (max-min)/30;
	var res = [];
	for(var i = 0; i <30; i++){
		res.push(+(min+diff*i).toFixed(2));
	}
	return res;
}

//Generate 30 random volumes for bar graph.
var getRandomHeights = function(){
    var res= [];
    for(var i = 0; i <30; i++){
		res.push(Math.round(Math.random()*100));
	}
	return res;
}

//Get Average price of randomly generated data
var getAverage = function(pArr, vArr){
    var total = 0;
    for(var i = 0; i<30;i++){
        total+=pArr[i]*vArr[i];
    }
    return total/(vArr.reduce((accum,x)=>{return accum+x}));
}
//Create 100 rows of data
for(var i = 0; i <100; i++){
    var min = parseFloat(faker.finance.amount(0.01, 10, 2));
    var max = parseFloat(faker.finance.amount(min, min+100, 2));
    var pricesArr = generateUniformRange(min, max);
    var volumeArr = getRandomHeights();
    var avg = getAverage(pricesArr, volumeArr);
    var companyName = faker.company.companyName(0);
    var companySymbol = companyName.toUpperCase();

    var newData = {
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