'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _pet = require('./pet');

var _pet2 = _interopRequireDefault(_pet);

var _graffitiMongoose = require('@risingstack/graffiti-mongoose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql');

exports.default = (0, _graffitiMongoose.getSchema)([_pet2.default, _user2.default]);