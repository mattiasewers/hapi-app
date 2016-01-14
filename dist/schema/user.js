'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  name: {
    type: String
  },
  age: {
    type: Number,
    index: true
  },
  friends: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User'
  }],
  pets: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var User = _mongoose2.default.model('User', UserSchema);

exports.default = User;