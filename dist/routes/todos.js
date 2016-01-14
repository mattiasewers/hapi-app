'use strict';

var Todos = require('../collections/Todos');

module.exports = [{
  method: 'GET',
  path: '/todos',
  handler: function handler(req, res) {
    Todos.find({ createdOn: { $lte: req.createdOnBefore } }).sort('-time').exec(function (err, docs) {
      res(docs);
    });
  }
}, {
  method: 'POST',
  path: '/todos',
  handler: function handler(req, res) {

    var todos = new Todos({
      name: req.payload.name
    });

    todos.save(function (err, docs) {
      res(docs);
    });
  }
}, {
  method: 'DELETE',
  path: '/todos/{id}',
  handler: function handler(req, res) {

    Todos.remove({ _id: req.params.id }, function (err) {
      if (err) return handleError(err);
      res({ _id: req.params.id });
    });
  }
}];