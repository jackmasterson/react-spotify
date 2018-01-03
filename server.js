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

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         console.log('user: ', User);
//         User.checkDatabase( { username: username }, function(err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username' });
//             }
//             if (!User.validPassword(password)) {
//                 return done(null, false, { message: 'Incorrect Password' });
//             }
//             return done(null, user);
//         });
//     }
// ));

app.use(express.static(DIST_DIR));
// app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });

console.log('server is listening on port: ', PORT);

function sendSongs() {
    app.post('/tracks', (req, res) => {
        let songIds = [];
        let trackInfo = [];
        db.spotify.from('userToSongs')
        .select('*')
        .where({userId: userId})
        .then((response) => {
            console.log('this here: ', response);
            for (let resp of response) {
                songIds.push(resp.songId);
            }
            db.spotify.from('songs')
                .select('*')
                .whereIn('id', songIds)
                .then((responseTwo) => {
                    console.log('response two: ', responseTwo);
                    trackInfo.push(responseTwo);
                    res.send(responseTwo);
                })
        })
    })
}

function sendArtists() {
    app.post('/artists', (req, res) => {
        db.spotify.from('artists')
            .select('*')
            .then((response) => {
                res.send(response);
            });
    })
}

function sendAlbums() {
    app.post('/albums', (req, res) => {
        db.spotify.from('albums')
        .select('*')
        .then((response) => {
            res.send(response);
        });
    })
}

let self = this;
let songId;
let userId;

app.get('*', (req, res) => {
    if (!this.authed) {
        res.sendFile(path.join(DIST_DIR, 'signIn.html'));
    } else {
        res.sendFile(path.join(DIST_DIR, 'authed.html'));
        sendArtists();
        sendAlbums();
        sendSongs();
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
                console.log('here: ', response);
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
    app.post('/save-track', (req, res) => {
        console.log(req.body.name);
        db.spotify('songs').where({name: req.body.name})
        .then((res) => {
            songId = res[0].id;
            console.log('songId: ', songId);
            if (res.length === 0) {
                db.spotify.from('songs')
                    .insert({
                        name: req.body.name,
                        artist: req.body.name,
                        album: req.body.name
                    })
                    .then((res) => {
                        console.log('res: ', res);
                        // sendSongs();
                    })
            }
            console.log('userid: ', userId);
            console.log('songId;"<', songId);
            db.spotify('userToSongs').where({
                userId: userId,
                songId: songId
            })
                .then((res) => {
                    console.log('res: ', res);
                    if (res.length === 0) {
                        db.spotify.from('userToSongs')
                            .insert({
                                userId: userId,
                                songId: songId
                            })
                            .then((res) => {
                                console.log('res: ', res);
                                sendSongs();
                            })
                    }
                })
        });

    });
    // need to update for different fields defaults
    // need to update client side

    // app.post('/save-album', (req, res) => {
    //     console.log('req: ', req.body.name);
    //     db.spotify.from('albums')
    //         .insert({
    //             album: req.body.name
    //         })
    //         .then((res) => {
    //             console.log('res: ', res);
    //         })
    // });
    // app.post('/save-artist', (req, res) => {
    //     console.log('req: ', req.body.name);
    //     db.spotify.from('artists')
    //         .insert({
    //             artist: req.body.name
    //         })
    //         .then((res) => {
    //             console.log('res: ', res);
    //         })
    // });
});