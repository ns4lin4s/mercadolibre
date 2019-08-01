
'use strict';

const PORT = 3000;

import { join } from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import ReactEngine from 'react-engine';
import routes from './public/routes.jsx';

const request = require('request');

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


app.get('/views/*', (req, res) => {
  res.render(req.url, { });
})

app.get('/*.css', (req, res) => {
  res.render(req.url, { });
})

app.get('/*.js', (req, res) => {
  res.render(req.url, { });
})

app.get('/resultados', (req, res) => {
  
  let q_param = req.query.q == undefined ? '' : req.query.q;
  
  res.render(req.url, { q:  q_param});
})

app.get('/detalle/:id', (req, res) => {
  res.render(req.url, { id: req.params.id});
})

app.get('/', (req, res) => {
  res.render(req.url, { });
});

app.get('/api/items',(req, res) => {
  
  let q_param = req.query.q;
  
  if(q_param == undefined)
    return res.json({ data: null, status_code: 500, message: 'No se ha ingresado valor para realizar una búsqueda' });

  let data = {
    author: {
      name: "Nelson",
      lastname: "Salinas"
    },
    categories:[],
    items:[]
  }

  let options = {
    url: 'https://api.mercadolibre.com/sites/MLA/search?q=' + decodeURIComponent(q_param),
    headers: {
      'User-Agent': 'request',
      "Content-Type": "charset=UTF-8"

    } 
  }

  request(options, function (error, response, body) {
    
    if(error)
      return res.json({ data: null, status_code: 500, message: 'Ha ocurrido un error al conectarse a la api' });

    let output = JSON.parse(body)
  
    data.items = output.results.map((element) => {
      return {
        id: element.id, 
        title: element.title, 
        price: {
          currency: element.installments.currency_id,
          amount: parseInt(element.installments.amount, 10),
          decimal: element.installments.amount
        }, 
        picture: element.thumbnail,
        condition: element.condition,
        free_shipping: element.shipping.free_shipping
      }
    })
    
    let categories = output.filters.filter((element) => element.id  === "category")
    
    if(categories.length > 0)
    {
      if(categories[0].values.length)
        data.categories = categories[0].values.map((element) => element.path_from_root)
    }

    return res.json({ data });
  })
  
})

app.get('/api/items/:id',(req, res) => {
  
  let data = {
    author: {
      name: "Nelson",
      lastname: "Salinas"
    },
    item: {
      id: 0, 
      title: '', 
      price: {
        currency: '',
        amount: 0,
        decimal: 0
      }, 
      picture: '',
      condition: '',
      free_shipping: false,
      sold_quantity: 0,
      description: ''

    }
  }

  let options_item = {
    url: 'https://api.mercadolibre.com/items/' + req.params.id,
    headers: {
      'User-Agent': 'request',
      "Content-Type": "charset=UTF-8"
    } 
  }

  let options_item_description = {
    url: 'https://api.mercadolibre.com/items/' + req.params.id + '/description',
    headers: {
      'User-Agent': 'request',
      "Content-Type": "charset=UTF-8"
    } 
  }

  let promise_item = new Promise((resolve, reject) => {
    return request(options_item, function (error, response, body) {
      
      if(error)
        return reject()

      let output = JSON.parse(body)
      
      let item = {
        id: output.id,
        title: output.title,
        condition: output.condition,
        sold_quantity: output.sold_quantity,
        price_amount: parseInt(output.price, 10),
        price_decimal: output.price,
        price_currency: output.currency_id,
        picture: (output.pictures != null && output.pictures.length > 0) ? output.pictures[0].url : output.thumbnail
      }

      return resolve(item)
    })
  })

  let promise_item_description =  new Promise((resolve, reject) => {
    return request(options_item_description, function (error, response, body) {
      if(error)
        return reject()
      
      let output = JSON.parse(body)

      return resolve(output.plain_text)
    })
  })
  

  return Promise.all([promise_item,promise_item_description]).then((output)=>{
    
    let valid = (output.length > 0)

    data.item.id = (valid) ? output[0].id : -1
    data.item.title = (valid) ? output[0].title : ''
    data.item.sold_quantity = (valid) ? output[0].sold_quantity : -1
    data.item.free_shipping = (valid) ? output[0].free_shipping : false
    data.item.condition = (valid) ? output[0].condition : -1
    data.item.picture = (valid) ? output[0].picture : ''
    data.item.price = {
      amount: (valid) ? output[0].price_amount : 0,
      decimal: (valid) ? output[0].price_decimal : 0,
      currency: (valid) ? output[0].price_currency : ''
    } 
    data.item.description = (output.length > 1) ? output[1] : ''
    
    return res.json(data);
  
  }).catch((reason) => {
    console.log(reason)
    return res.json(data.item);
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
