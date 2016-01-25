var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../lib/db/dist/schema.json');

module.exports = getBabelRelayPlugin(schema.data);