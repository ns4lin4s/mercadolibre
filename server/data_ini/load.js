var request = require('request');
var Station = require('../models/Station');
var mongoose = require('mongoose')
//var StationLog = require('../models/StationLog');


mongoose
  .connect(
    'mongodb://mongo:27017/bikesantiago',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


let promise = new Promise((resolve,reject)=> {
  request('http://api.citybik.es/v2/networks/bikesantiago', function (error, response, body) {
    var output = JSON.parse(body)
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('cantidad de estaciones' + output.network.stations.length)
    
    return resolve(output.network.stations.forEach(element => {

        const station = new Station({
            id: element.id,
            name: element.name
        });
        
        station.save().then(()=>{console.log("inserted: " + element.id)})
    }))
    
  });
}) 

promise.then(()=>{
  mongoose.connection.close()
})

