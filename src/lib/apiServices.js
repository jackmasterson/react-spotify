// query the database

export const getSavedArtists = () => {
    // console.log('getting saved artists');
    return [{
        artist: 'The Beatles'
    }, {
        artist: 'The Rolling Stones'
    }, {
        artist: 'The Who'
    }, {
        artist: 'Dawes'
    }, { 
        artist: 'Josh Ritter'
    }];
}

export const getSavedAlbums = () => {
    return [{
        album: 'Sgt Pepper\'s Lonely Hearts Club Band',
        artist: 'The Beatles',
        released: '1969',
        trackList: [{
            track: 'Sgt Pepper',
            lyrics: 'It was twenty years ago today...'
        }, {
            track: 'A Little Help from my Friends',
            lyrics: 'What would you do if I sang you a tune...'
        }, {
            track: 'Lucy in the Sky with Diamonds',
            lyrics: 'Picture yourself on a boat on a river...'
        }]
    }, {
        album: 'Rubber Soul',
        artist: 'The Beatles',
        released: '1964',
        trackList: [{
            track: 'Something',
            lyrics: 'Something in the way she moves...'
        }, {
            track: 'Drive My Car',
            lyrics: 'Asked a girl what she wanted to be...'
        }]
    }];
}

export const getSavedTracks = () => {
    // console.log('getting saved tracks');
    return [{
        name: 'Lucy in the sky with diamonds',
        album: 'Sgt Pepper',
        artist: 'The Beatles'
    }, {
        name: 'Being for the Benefit of Mr. Kite',
        album: 'Sgt Pepper',
        artist: 'The Beatles'
    }, {
        name: 'In My Life',
        album: 'Revolver',
        artist: 'The Beatles'
    }];
}

export const initiateSave = (type, item) => {
    // console.log('type: ', type);
    // console.log('item: ', item);
    // stuff to save to database
    // spoofed for now
    return true;

}

export const initiateDataGrab = (type) => {
    if (type === 'artists') {
        return getSavedArtists();
    } else if (type === 'albums') {
        return getSavedAlbums();
    } else if (type === 'tracks') {
        return getSavedTracks();
    }
}

export const makeApiCall = (name, type) => {
    return fetch(`https://api.spotify.com/v1/search?q=${name}&type=${type}`, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth')
        }
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        throw new Error(err);
    })
}