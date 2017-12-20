const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const DIST_DIR = path.join(__dirname, 'dist');
const axios = require('axios');
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT);

console.log('server is listening on port: ', PORT);

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});
console.log('here: ', process.env.SPOTIFY_ID);
axios({
    method: 'get',
    url: `https://accounts.spotify.com/authorize/?client_id=${process.env.SPOTIFY_ID}&response_type=code&redirect_uri=http://localhost:/${PORT}`
})
.then((res) => {
    const success = 300;
    console.log('res: ', res);
})
.catch((err) => {
    console.log('err is: ', err);
});