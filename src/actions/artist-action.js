import { getSavedArtists } from '../lib/apiServices';
import { makeSelection } from './query-action';
import { ARTIST_REQUEST } from '../types/types';

export const artistsSearched = (res) => {
    return (dispatch) => {
        dispatch(artistsRequested(res));
    }
}

export const artistsRequested = (value) => {
    return {
        type: ARTIST_REQUEST,
        payload: value
    }
}
