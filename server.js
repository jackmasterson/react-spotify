const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'dist');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const redirect_uri = encodeURIComponent('http://localhost:3000/callback');
console.log('server is listening on port: ', PORT);


app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'authed.html'));
    // res.redirect('https://accounts.spotify.com/authorize' +
    //     '?response_type=code' +
    //     '&client_id=' + process.env.SPOTIFY_ID +
    //     '&scope=' + encodeURIComponent('user-read-private user-read-email') +
    //     '&redirect_uri=' + redirect_uri
    // );
});
// app.get('/callback', (req, res) => {
    // res.sendFile(path.join(DIST_DIR, 'authed.html'));
    // let url = res.req.url;
    // let token = url.split('?code=')[1];
    // const baseUrl = 'https://accounts.spotify.com/api/token/';
    // const grantType = 'authorization_code';
    // const postTo = `${baseUrl}?grant_type=${grantType}&code=${token}&redirect_uri=${redirect_uri}`;
    // console.log('post to: ', postTo);
    // app.post('/callback', (req, res) => {
    //     console.log('res: ', res);
    //     console.log('req: ', req);
    // })

    // res.header('Authorization: Basic' + Buffer.from("436eb254d5494c8d81cf1e8efee953c6:762c4f18edc04ab2a479b860bbacbbb6").toString('base64'));
    // app.post('https://accounts.spotify.com/api/token' +
    // '?grant_type=authorization_code' + 
    // '&code=' + token +
    // '&redirect_uri=' + encodeURIComponent('http://localhost:3000/callback'))
// });