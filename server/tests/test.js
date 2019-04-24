const mongoose = require('mongoose')
const moment = require('moment')
const Station = require('../models/Station');
const StationLog = require('../models/StationLog');

mongoose.connection.close()

mongoose
.connect(
    "mongodb://localhost:27017/bikesantiago",
    { useNewUrlParser: true }
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


/*
StationLog
.aggregate(
    [
        
        { "$sort" : { date : -1, name: -1 } },
        {
            "$group":
            {
                _id: "$id",
                name: { "$first": "$name"},
                available_bikes: {$sum: "$available_bikes"},
                busy_bikes: {$sum: "$busy_bikes"},
                expand: {$push: { id:"$id",name:"$name", date: "$date",busy_bikes:"$busy_bikes",available_bikes: "$available_bikes" } }
            },
        },
        { "$group": {
            "_id": {$minute:"$expand.date"}
        }}
        //{"$unwind": "$expand"},
        // { 
        //     "$project": {
        //         id: "$_id",
        //         name: "$name",
        //         totalLibres: "$available_bikes",
        //         totalUsadas: "$busy_bikes",
        //         expand : { 
        //           "$slice": [ "$expand", 10 ],

        //         }
                    
        //     }
        // }
    ])
//.limit(5)
.then((output)=>{
    //console.log(output)
    output.forEach(element => {
        
        let counter = 0
        // element.expand.forEach((item)=>{
        //     item.id = counter
        //     item.date = moment(item.date).fromNow()    
        //     counter++
        // })

        console.log(element)
    })
    
    
    mongoose.connection.close()
})
.catch(reason => { console.log(reason);mongoose.connection.close() })

*/
const request = require('request');


request('http://api.citybik.es/v2/networks/bikesantiago', function (error, response, body) {
    var output = JSON.parse(body)
    
    output.network.stations.forEach(element => {

        const stationLog = new StationLog({
            id: element.id,
            name: element.name,
            available_bikes: element.free_bikes,
            busy_bikes: element.empty_slots,
            latitude: element.latitude,
            longitude: element.longitude,
            //date_formated: moment(element.timestamp).fromNow(),
            date: element.timestamp,
            date_formatted: element.id + '-' + element.free_bikes + '-' + element.empty_slots + '-' + moment(element.timestamp).format('YYYY-MM-DD HH:mm')
        });

        stationLog.save().then(value => { 

            console.log(value);

        }).catch(e => { console.log("¿¿¿¿¿¿¿¿¿¿¿¿?????????????");console.log(e) })
    })
})