
'use strict';

const PORT = 3000;

import { join } from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import ReactEngine from 'react-engine';
import routes from './public/routes.jsx';
import mongoose from 'mongoose'
import moment from 'moment'
var request = require('request');

let app = express();

// create the view engine with `react-engine`
let engine = ReactEngine.server.create({
  routes,
  routesFilePath: join(__dirname, '/public/routes.jsx'),
  performanceCollector: (stats) => {
    console.log(stats);
  }
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', join(__dirname, '/public/views'));

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', ReactEngine.expressView);

// expose public folder as static assets
app.use(express.static(join(__dirname, '/public')));

app.use(favicon(join(__dirname, '/public/favicon.ico')));

const Station = require('./models/Station');
const StationLog = require('./models/StationLog');

const env = process.env.NODE_ENV
let connectionString = ""

if(env === 'dev')
{
  connectionString =  'mongodb://localhost:27017/bikesantiago'
}
else
{
  connectionString =  'mongodb://mongo:27017/bikesantiago'
}

// Connect to MongoDB
mongoose
  .connect(
    connectionString,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/views/*', (req, res) => {
  res.render(req.url, { });
})

app.get('/*.css', (req, res) => {
  res.render(req.url, { });
})

app.get('/*.js', (req, res) => {
  res.render(req.url, { });
})

app.get('/', (req, res) => {
  
  Promise.all(
    [
      Station.find(),
      StationLog.find().sort({date: 'desc', name: 'asc'}),
      StationLog.find({
        date: {
          $lt: new Date(), 
          $gte: new Date(new Date().setHours(new Date().getHours()-1))
        }
      })
    ]
  ).then((output) => {
    res.render(req.url, { stations: output[0], stations_history: output[1], graphs: output[2] } );
  }) 
});

app.get('/station/:id',(req, res) => {
  
  Promise.all(
    [
      Station.find({ id : req.params.id }),
      StationLog.find({ id : req.params.id }).sort({date: 'desc', name: 'asc'}),
      StationLog.find({
        id : req.params.id,
        date: {
          $lt: new Date(), 
          $gte: new Date(new Date().setHours(new Date().getHours()-1))
        }
      })
    ]
  ).then((output) => {

    res.json({ stations: output[0], stations_history: output[1], graphs: output[2] });

  })
})

app.get('/cron',(req,res)=>{
  //TODO: Agregar seguridad
  console.log("GET/cron")
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
        date_formatted: moment(element.timestamp).format('YYYY-MM-DD HH:mm')
      });
      
      StationLog.find({ 
        date_formatted : element.date_formatted, 
        available_bikes: element.free_bikes, 
        busy_bikes: element.busy_bikes  
      }).then((exist)=>{
        console.log(exist)
        if(exist != null && exist.length > 0) 
        {
          console.log("Se encuentra en nuestra base de datos.")
        }
        else
        {
          stationLog.save().then(item => { 
            //console.log(item)
          });
        }
      }).catch(reason=>{console.log(reason)})

      // stationLog.save().then(item => { 
      //   console.log(item)
      // });

      // exist.find({}).then(element => {
        
      // })
    });

    res.json({code:200});
  })

})

app.use((err, req, res, next) => {
  console.error(err);

  // http://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    return next(err);
  }

  if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
    return res.redirect(302, err.redirectLocation);
  }
  else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
    return res.status(404).render(req.url);
  }
  else {
    // for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR or
    // any other error we just send the error message back
    return res.status(500).render('500.jsx', {
      err: {
        message: err.message,
        stack: err.stack
      }
    });
  }
});

app.listen(PORT, () => {
  console.log('Example app listening at http://localhost:%s', PORT);
});
