const initialState = [{
    artist: 'The Beatles',
    albums: [{
        title: 'Sgt Pepper',
    }, {
        title: 'Magical Mystery Tour'
    }, {
        title: 'Rubber Soul'
    }]
}];

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return { state }
    }
}