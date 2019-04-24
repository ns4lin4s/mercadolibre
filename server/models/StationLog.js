const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationLogSchema = new Schema({

    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    available_bikes: {
        type: Number,
        required: true,
        
    },
    busy_bikes: {
        type: Number,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
        
    },
    date: {
        type: Date,
        required: true
    },
    date_formatted: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ date_formatted: value })
                .exec(function(err, station){
                    console.log("========================")
                    console.log(station)
                    console.log(self)
                    console.log("========================")
                    if(err)
                        throw err;
                    else if (station)
                    {
                        if(self.id === station.id 
                            && self.busy_bikes == station.busy_bikes
                            && self.available_bikes == station.available_bikes  
                            && self.date_formatted === station.date_formatted)
                        {
                            return isValid(true);
                        }
                        else
                            return isValid(false);
                    }
                    else
                        return isValid(true);
                    

                })
            },
            message:  'The date is already taken!'
        },
    },
    
});

module.exports =  mongoose.model('StationLog', StationLogSchema);