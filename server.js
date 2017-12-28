const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'dist');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
// const bodyParser = require('body-parser');
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
// app.use(bodyParser.urlencoded({ extended: false }));
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


// app.get('/login', (req, res) => {
//     res.sendFile(path.join(DIST_DIR, 'signIn.html'));

//     app.post('/login',
//         passport.authenticate('local', {
//             successRedirect: '/',
//             failureRedirect: '/login'
//         })
//     );

//     // app.get('/login', (req, res) => {
//     //     res.sendFile(path.join(DIST_DIR, 'signIn.html'));
//     // });

// });




console.log('server is listening on port: ', PORT);

app.get('/', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'signIn.html'));
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + process.env.SPOTIFY_ID +
        '&scope=' + encodeURIComponent('user-read-private user-read-email') +
        '&redirect_uri=' + redirect_uri
    );
});
app.get('/callback', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'authed.html'));
});