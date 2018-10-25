const db = require('./index.js');
const PriceVolume = require('./PriceVolume.js');
var faker = require('faker');

const randomData = [];

for(var i = 0; i <100; i++){

    var min = faker.finance.amount(10, 99, 2);
    var max = faker.finance.amount(min, 100, 2);
    var pricesArr = generateUniformRange(min, max);
    var volumeArr = getRandomHeight();
    var avg = getAverage(pricesArr, volumeArr);
    

    var newData = {
        symbol: faker.company.companyName(0),
        name: faker.company.companyName(0).toUpperCase(),
        prices: pricesArr,
        volumes: volumeArr,
        averagePrice: avg,
        currentPrice: faker.finance.amount(min, max, 2)
    }
    randomData.push(newData);
}


var generateUniformRange = function(min, max){
	var diff = (max-min)/30;
	var res = [];
	for(var i = 0; i <30; i++){
		res.push(Math.round(min+diff*i));
	}
	return res;
}

var getRandomHeights = function(){
    var res= [];
    for(var i = 0; i <30; i++){
		res.push(Math.round(Math.random()*100));
	}
	return res;
}

var getAverage = function(pArr, vArr){
    var total = 0;
    for(var i = 0; i<30;i++){
        total+=pArr[i]*vArr[i];
    }
    return total/30;
}