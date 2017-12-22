const initialState = [{
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

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return { state }
    }
}