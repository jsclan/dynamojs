'use strict';

const https = require('https');
const AWS = require('aws-sdk');
//const Schema = require('./schema');
//const Model = require('./model');
//const Types = require('./types');

function Dynamojs() {
  this.AWS = AWS;
  this.connections = [];
  this.models = {};
  this.modelSchemas = {};

  this.defaults = {
    create: true,
    waitForActive: true,
    waitForActiveTimeout: 180000,
    prefix: '',
    suffix: ''
  };


  //connection.models = this.models;

  /*Object.defineProperty(this, 'plugins', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: [
      [saveSubdocs, { deduplicate: true }],
      [validateBeforeSave, { deduplicate: true }],
      [shardingPlugin, { deduplicate: true }],
      [removeSubdocs, { deduplicate: true }]
    ]
  });*/
}

Dynamojs.prototype.openConnection = function(uri, options, callback) {
  const endpointURI = uri || 'http://localhost:8000';
  const connection = new AWS.DynamoDB({
    endpoint: new AWS.Endpoint(endpointURI)
  });

  if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  this.connections.push(connection);

  return connection;
};

var dynamojs = module.exports = exports = new Dynamojs();