'use strict';

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todos');

let Todos = mongoose.model('Todo', { name: String, time : { type : Date, default: Date.now }});

module.exports = Todos;
