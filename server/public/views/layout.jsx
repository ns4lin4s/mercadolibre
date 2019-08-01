
'use strict';

const React = require('react');

module.exports = (props) => {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
        <title>Mercadolibre</title>
        <link rel='stylesheet' href='/css/output.css'></link>
      </head>
      <body>

          {props.children}
      
          <script src='/bundle.js'></script>
      
      </body>


   
    </html>
  );
};
