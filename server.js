const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'dist');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const db = require('./db');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
// const User = require('./db/users');
const redirect_uri = encodeURIComponent('http://localhost:3000/callback');

app.use(express.static(DIST_DIR));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('server is listening on port: ', PORT);


let self = this;
let songId;
let userId;

app.get('*', (req, res) => {
    if (!this.authed) {
        res.sendFile(path.join(DIST_DIR, 'signIn.html'));
    } else {
        res.sendFile(path.join(DIST_DIR, 'authed.html'));
        getSongs();
    }
    app.post('/login', (req, res) => {
        let user = req.body.username;
        let pw = req.body.password;
        db.spotify.from('users')
        .select('*')
        .where({
            username: user,
            password: pw
        })
        .then((response) => {
            userId = response[0].uid;
            if (response.length > 0) {
                self.authed = true;
                res.redirect('https://accounts.spotify.com/authorize' +
                    '?response_type=token' +
                    '&client_id=' + process.env.SPOTIFY_ID +
                    '&scope=' + encodeURIComponent('user-read-private user-read-email') +
                    '&redirect_uri=' + redirect_uri
                );
            } else {
                res.redirect('/');
            }
        })
    });
});

app.post('/save-track', (req, res) => {
    let album = req.body.album.name;
    let artist = req.body.artists[0].name;
    let name = req.body.name;
    try {
        db.spotify.from('songs')
        .select('*')
        .where({name, artist, album})
        .then((res) => {
            if (res.length === 0) {
                addToSongs(name, artist, album);
            } else {
                console.log('res for from songs: ', res);
            }
        })
    } 
    catch(err){
        throw new Error(err);
    }
});

function addToSongs(name, album, artist) {
    db.spotify('songs')
    .insert({name, album, artist})
    .then((songId) => {
        addToUsersToSongs(songId[0]);
    })
    .catch((err) => {
        throw new Error(err);
    })
}

function addToUsersToSongs(songId) {
    db.spotify('userToSongs')
    .insert({userId, songId})
    .then((res) => {
        getSongs();
    });
}

function getSongs() {
    db.spotify.from('songs')
    .join('userToSongs', 'songs.id', '=', 'userToSongs.songId')
    .then((getSongsRes) => {
        sendSongs(getSongsRes);
    })
}
function sendSongs(response) {
    console.log('here: ');
    app.post('/tracks', (req, res) => {
        res.send(response);
    })
}