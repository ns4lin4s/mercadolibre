
'use strict';

// import the react-router routes
const Routes = require('./routes.jsx');

// import the react-engine's client side booter
const ReactEngineClient = require('react-engine/lib/client');

// boot options
const options = {
  routes: Routes,

  // supply a function that can be called
  // to resolve the file that was rendered.
  //viewResolver: (viewName) => require('./views/' + viewName),
};

document.addEventListener('DOMContentLoaded', () => {
  // boot the app when the DOM is ready
  ReactEngineClient.boot(options);
});
