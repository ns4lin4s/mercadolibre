
'use strict';

const React = require('react');

module.exports = (props) => {
  return (
    <div>
      <h1>Internal Service Error (500)</h1>
      <h3>Error message: {props.err.message}</h3>
      <code>{props.err.stack}</code>
    </div>
  );
};
