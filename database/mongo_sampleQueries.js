//Mongodb queries to measure query times
db.pricevolumes.find({symbol: 'VWYXJ'}).explain("executionStats")
db.pricevolumes.find({symbol: 'VWYXE'}).explain("executionStats")
db.pricevolumes.find({symbol: 'VWYXA'}).explain("executionStats")

db.pricevolumes.find({id: 9999990}).explain("executionStats")
db.pricevolumes.find({id: 9999995}).explain("executionStats")
db.pricevolumes.find({id: 9999999}).explain("executionStats")