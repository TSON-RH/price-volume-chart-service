//Mongodb queries to measure read times
db.pricevolumes.find({symbol: 'VWYXJ'}).explain("executionStats")
db.pricevolumes.find({symbol: 'VWYXE'}).explain("executionStats")
db.pricevolumes.find({symbol: 'VWYXA'}).explain("executionStats")

db.pricevolumes.find({id: 9999990}).explain("executionStats")
db.pricevolumes.find({id: 9999995}).explain("executionStats")
db.pricevolumes.find({id: 9999999}).explain("executionStats")

//Mongodb queries to measure insert times
//insert new stock

//insert new timepoint for an existing stock -- neither of these currently work
db.pricevolumes.insert({id : 10000001, symbol : "VWYXB", prices : [5.07,5.27,5.48,5.68,5.89,6.09,6.29,6.5,6.7,6.91,7.11,7.31,7.52,7.72,7.93,8.13,8.33,8.54,8.74,8.95,9.15,9.35,9.56,9.76,9.97,10.17,10.37,10.58,10.78,10.99], volumes : [7,82,89,78,42,59,62,81,83,27,82,19,88,97,99,34,8,52,76,38,38,43,20,13,77,33,51,61,27,29], lowest : 5.07, highest : 11.19, averagePrice : 8.13, currentPrice : 7.52 })
db.pricevolumes.insert({id : 10000002, symbol : "VWYXC", prices : [5.07,5.27,5.48,5.68,5.89,6.09,6.29,6.5,6.7,6.91,7.11,7.31,7.52,7.72,7.93,8.13,8.33,8.54,8.74,8.95,9.15,9.35,9.56,9.76,9.97,10.17,10.37,10.58,10.78,10.99], volumes : [7,82,89,78,42,59,62,81,83,27,82,19,88,97,99,34,8,52,76,38,38,43,20,13,77,33,51,61,27,29], lowest : 5.07, highest : 11.19, averagePrice : 8.13, currentPrice : 7.52 })
db.pricevolumes.insert({id : 10000003, symbol : "VWYXD", prices : [5.07,5.27,5.48,5.68,5.89,6.09,6.29,6.5,6.7,6.91,7.11,7.31,7.52,7.72,7.93,8.13,8.33,8.54,8.74,8.95,9.15,9.35,9.56,9.76,9.97,10.17,10.37,10.58,10.78,10.99], volumes : [7,82,89,78,42,59,62,81,83,27,82,19,88,97,99,34,8,52,76,38,38,43,20,13,77,33,51,61,27,29], lowest : 5.07, highest : 11.19, averagePrice : 8.13, currentPrice : 7.52 })
db.pricevolumes.insert({id : 10000004, symbol : "VWYXE", prices : [5.07,5.27,5.48,5.68,5.89,6.09,6.29,6.5,6.7,6.91,7.11,7.31,7.52,7.72,7.93,8.13,8.33,8.54,8.74,8.95,9.15,9.35,9.56,9.76,9.97,10.17,10.37,10.58,10.78,10.99], volumes : [7,82,89,78,42,59,62,81,83,27,82,19,88,97,99,34,8,52,76,38,38,43,20,13,77,33,51,61,27,29], lowest : 5.07, highest : 11.19, averagePrice : 8.13, currentPrice : 7.52 })
db.pricevolumes.insert({id : 10000005, symbol : "VWYXF", prices : [5.07,5.27,5.48,5.68,5.89,6.09,6.29,6.5,6.7,6.91,7.11,7.31,7.52,7.72,7.93,8.13,8.33,8.54,8.74,8.95,9.15,9.35,9.56,9.76,9.97,10.17,10.37,10.58,10.78,10.99], volumes : [7,82,89,78,42,59,62,81,83,27,82,19,88,97,99,34,8,52,76,38,38,43,20,13,77,33,51,61,27,29], lowest : 5.07, highest : 11.19, averagePrice : 8.13, currentPrice : 7.52 })
db.pricevolumes.insert({id : 10000006, symbol : "VWYXG", prices : [5.07,5.27,5.48,5.68,5.89,6.09,6.29,6.5,6.7,6.91,7.11,7.31,7.52,7.72,7.93,8.13,8.33,8.54,8.74,8.95,9.15,9.35,9.56,9.76,9.97,10.17,10.37,10.58,10.78,10.99], volumes : [7,82,89,78,42,59,62,81,83,27,82,19,88,97,99,34,8,52,76,38,38,43,20,13,77,33,51,61,27,29], lowest : 5.07, highest : 11.19, averagePrice : 8.13, currentPrice : 7.52 })

db.pricevolumes.update({id: 9999990}, 
  {$push: {
    prices: 11.11,
    volumes: 11,
    }
  })


 //to add index on id
 db.pricevolumes.createIndex({id: 1})

 //to add index on symbol
 db.pricevolumes.createIndex({symbol: 1})