'use strict';

var Path = require('path');

module.exports = [{
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: Path.join(__dirname, '../../assets'),
            index: false,
            listing: false
        }
    }
}];