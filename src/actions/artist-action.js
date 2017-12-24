import { ARTIST_REQUEST } from '../types';

export const getArtists = (value) => {
    return {
        type: ARTIST_REQUEST,
        payload: value
    }
}