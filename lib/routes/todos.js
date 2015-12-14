'use strict';

const Todos = require('../collections/Todos');

module.exports = [
  {
    method: 'GET',
    path: '/todos',
    handler: (req, res) => {
      Todos.find( { createdOn: { $lte: req.createdOnBefore } } )
        .sort( '-time' ).exec((err, docs) => {
          res(docs);
      });
    }
  },
  {
    method: 'POST',
    path: '/todos',
    handler: (req, res) => {

      let todos = new Todos({
        name: req.payload.name
      });

      todos.save((err, docs) => {
        res(docs);
      });

    }
  },
  {
    method: 'DELETE',
    path: '/todos/{id}',
    handler: (req, res) => {

      Todos.remove({_id: req.params.id}, (err) => {
        if (err) return handleError(err);
        res({_id: req.params.id});
      });

    }
  }
];
