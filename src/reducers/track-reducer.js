const initialState = [{
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

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return { state }
    }
}