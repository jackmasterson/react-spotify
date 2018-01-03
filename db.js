var config = require('./knexfile.js');

var spotify = 'spotify';
var knexSpotify = require('knex')(config[spotify]);

module.exports = {
    spotify: knexSpotify
};

knexSpotify.migrate.latest([config]);
