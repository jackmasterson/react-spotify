import { TRACK_REQUEST } from '../types';

export const getTrackss = (value) => {
    return {
        type: TRACK_REQUEST,
        payload: value
    }
}