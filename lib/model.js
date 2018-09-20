/**
 * Created by G on 20.09.2018.
 */
const Schema = require('./schema');

function Model(doc, fields, skipId) {
  if (fields instanceof Schema) {
    throw new TypeError('2nd argument to `Model` must be a POJO or string, ' +
      '**not** a schema. Make sure you\'re calling `dynamojs.model()`, not ' +
      '`dynamojs.Model()`.');
  }
  //Document.call(this, doc, fields, skipId);
}

Model.prototype.db;
Model.prototype.collection;
Model.prototype.modelName;

module.exports = exports = Model;