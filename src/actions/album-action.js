import { ALBUM_REQUEST } from '../types';

export const getAlbums = (value) => {
    return {
        type: ALBUM_REQUEST,
        payload: value
    }
}