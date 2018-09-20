/**
 * Created by G on 20.09.2018.
 */



function Schema(obj, options) {
  if ( !(this instanceof Schema) ) {
    return new Schema(obj, options);
  }
  this.options = this.defaultOptions(options);
  this.obj = obj;

  if (this.options.timestamps) {
    this.setupTimestamp(this.options.timestamps);
  }
}

Schema.prototype.setupTimestamp = function(timestamps) {

};

Schema.prototype.constructor = Schema;
Schema.prototype.instanceOfSchema = true;

Schema.prototype.defaultOptions = function(options) {
  return options;
};

module.exports = exports = Schema;

//Schema.Types = DynamoTypes = require('./schema/index');