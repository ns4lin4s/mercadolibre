const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new Schema({
  
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    history : [{ type: Schema.Types.ObjectId, ref: 'StationLog' }]
});

module.exports =  mongoose.model('Station', StationSchema);