const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'dist');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const db = require('./db');
const tracks = require('./tracks');

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

// save and get track routes
app.post('/saved-track', (req, res) => {
    let album = req.body.album.name;
    let artist = req.body.artists[0].name;
    let name = req.body.name;
    try {
        db.spotify.from('songs')
            .select('*')
            .where({ name, artist, album })
            .then((res) => {
                if (res.length === 0) {
                    tracks.addToSongs(name, artist, album, userId, res);
                }
            })
    }
    catch (err) {
        throw new Error(err);
    }
});

app.post('/tracks', (req, res) => {
    tracks.sendSongs(res, userId)
    .then((getSongsRes) => {
        console.log('get song res: ', getSongsRes);
        res.send(getSongsRes);
    })
});
// end save and get track routes