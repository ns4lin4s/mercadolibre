
'use strict';

const React = require('react');

module.exports = (props) => {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <title>BikeSantiago - Dashboard</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.7.0/css/all.css" crossorigin="anonymous"></link>
        <link rel='stylesheet' href='/styles.css'></link>
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
        <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' />
        
      </head>
      <body id="page-top">


        <div id="wrapper">

          {props.children}

        </div>
        <a class="scroll-to-top rounded" href="#page-top">
          <i class="fas fa-angle-up"></i>
        </a>
        
        <script src='/bundle.js'></script>
      
      </body>


   
    </html>
  );
};
