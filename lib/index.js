'use strict';

const https = require('https');
const AWS = require('aws-sdk');
const Schema = require('./schema');
const Model = require('./model');
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

Dynamojs.prototype.model = function(name, schema, collection, skipInit) {
  let model;
  if (typeof name === 'function') {
    model = name;
    name = model.name;
    if (!(model.prototype instanceof Model)) {
      //throw new dynamojs.Error('The provided class ' + name + ' must extend Model');
    }
  }

  if (typeof schema === 'string') {
    collection = schema;
    schema = false;
  }

  if (utils.isObject(schema) && !(schema.instanceOfSchema)) {
    schema = new Schema(schema);
  }
  if (schema && !schema.instanceOfSchema) {
    //throw new Error('The 2nd parameter to `dynamojs.model()` should be a ' +
    //  'schema or a POJO');
  }

  if (typeof collection === 'boolean') {
    skipInit = collection;
    collection = null;
  }

  // handle internal options from connection.model()
  let options;
  /*if (skipInit && utils.isObject(skipInit)) {
    options = skipInit;
    skipInit = true;
  } else {
    options = {};
  }*/

  // look up schema for the collection.
  if (!this.modelSchemas[name]) {
    if (schema) {
      // cache it so we only apply plugins once
      this.modelSchemas[name] = schema;
    } else {
      //throw new dynamojs.Error.MissingSchemaError(name);
    }
  }

  const originalSchema = schema;
  /*if (schema) {
    if (this.get('cloneSchemas')) {
      schema = schema.clone();
    }
    this._applyPlugins(schema);
  }*/

  let sub;

  // connection.model() may be passing a different schema for
  // an existing model name. in this case don't read from cache.
  if (this.models[name] && options.cache !== false) {
    if (originalSchema && originalSchema.instanceOfSchema && originalSchema !== this.models[name].schema) {
      //throw new dynamojs.Error.OverwriteModelError(name);
    }

    if (collection) {
      /*// subclass current model with alternate collection
      model = this.models[name];
      schema = model.prototype.schema;
      sub = model.__subclass(this.connection, schema, collection);
      // do not cache the sub model
      return sub;*/
    }

    return this.models[name];
  }

  // ensure a schema exists
  if (!schema) {
    schema = this.modelSchemas[name];
    if (!schema) {
      //throw new dynamojs.Error.MissingSchemaError(name);
    }
  }

  if (!collection) {
    /*collection = schema.get('collection') ||
      utils.toCollectionName(name, this.pluralize());*/
  }

  /*const connection = options.connection || this.connection;
  model = this.Model.compile(model || name, schema, collection, connection, this);

  if (!skipInit) {
    // Errors handled internally, so safe to ignore error
    model.init(function $modelInitNoop() {});
  }

  if (options.cache === false) {
    return model;
  }

  this.models[name] = model;*/
  return this.models[name];
};

const dynamojs = module.exports = exports = new Dynamojs();