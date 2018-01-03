// query the database

export const getSavedArtists = () => {
    // console.log('getting saved artists');
    return  fetch('/artists', {
                method: 'POST',
                data: {}
            })
            .then(function (response) {
                return response.json()
            })
}

export const getSavedAlbums = () => {
    return fetch('/albums', {
            method: 'POST',
            data: {}
        })
        .then(function (response) {
            return response.json()
        });
}

export const getSavedTracks = () => {
    console.log('getting saved tracks');
    return fetch('/tracks', {
            method: 'POST',
            data: {}
        })
        .then(function (response) {
            return response.json()
        });
}

export const initiateSave = (type, item) => {
    console.log('type: ', type);
    console.log('item: ', item);
    let data = JSON.stringify(item);
    console.log('data: ', data);
    // stuff to save to database
    // spoofed for now
    return fetch('/tracks', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log('res: ', res);
            return res.json();
        })
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