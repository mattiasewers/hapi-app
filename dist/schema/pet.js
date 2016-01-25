'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PetSchema = new _mongoose2.default.Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  age: {
    type: Number
  }
});

var Pets = _mongoose2.default.model('Pets', PetSchema);

exports.default = Pets;