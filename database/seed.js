// const db = require('./index.js');
// const PriceVolume = require('./PriceVolume.js');
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

const numToSymbol = {
    '0': 'A', 
    '1': 'B', 
    '2': 'C', 
    '3': 'D', 
    '4': 'E', 
    '5': 'F', 
    '6': 'G', 
    '7': 'H', 
    '8': 'I', 
    '9': 'J',
    'a': 'K', 
    'b': 'L', 
    'c': 'M', 
    'd': 'N', 
    'e': 'O', 
    'f': 'P', 
    'g': 'Q', 
    'h': 'R', 
    'i': 'S', 
    'j': 'T',
    'k': 'U', 
    'l': 'V', 
    'm': 'W', 
    'n': 'X', 
    'o': 'Y', 
    'p': 'Z',
}
  
  function getSymbol(number) {
    const base26array = number.toString(26).split('');
    const symbolArray = base26array.map(val => numToSymbol[val]);
  
    return symbolArray.join('');
  }

module.exports = { 
    generateUniformRange: generateUniformRange,
    getAverage: getAverage,
    getRandomHeights: getRandomHeights,
    getSymbol: getSymbol
 }