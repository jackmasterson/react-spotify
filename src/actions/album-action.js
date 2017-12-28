import { ALBUM_REQUEST } from '../types/types';
import { makeSelection } from './query-action';

export const albumsSearched = (res) => {
    return (dispatch) => {
        dispatch(albumRequested(res));
    }
}

export const albumRequested = (value) => {
    return {
        type: ALBUM_REQUEST,
        payload: value
    }
}