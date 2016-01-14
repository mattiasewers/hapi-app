'use strict';

var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/todos');

var Todos = mongoose.model('Todo', { name: String, time: { type: Date, default: Date.now } });

module.exports = Todos;