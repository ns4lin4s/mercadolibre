
'use strict';

require('@babel/register')({
  presets: ['@babel/preset-env','@babel/preset-react'],
  plugins: [
    "syntax-dynamic-import",
    "react-loadable/babel",
    "babel-plugin-dynamic-import-node"
  ]
});

require('./server');
