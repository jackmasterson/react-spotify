const db = require('./db');

module.exports = {

    response: '',

    addToSongs: function(name, album, artist, userId, res) {
        db.spotify('songs')
        .insert({ name, album, artist })
        .then((songId) => {
            this.addToUsersToSongs(songId[0], userId);
        })
        .catch((err) => {
            throw new Error(err);
        })
    },

    addToUsersToSongs: function(songId, userId) {
        db.spotify('userToSongs')
        .insert({ userId, songId })
        .then((res) => {
            this.sendSongs();
        });
    },

    getSongs: function() {
        return db.spotify.from('songs')
        .innerJoin('userToSongs', 'songs.id', '=', 'userToSongs.songId')
    },

    sendSongs: function(res) {
        this.response = res;
        return this.getSongs();
    }

};