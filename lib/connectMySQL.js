var config = require('../config');

var knex = require('knex')({
    client: 'mysql',
    connection: config.get('mysql')
});
var Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');

module.exports = Bookshelf;