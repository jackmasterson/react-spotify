import { TRACK_REQUEST } from '../types/types';
import { makeSelection } from './query-action';

export const tracksSearched = (res) => {
    return (dispatch) => {
        dispatch(trackRequested(res));
    }
}

export const trackRequested = (value) => {
    return {
        type: TRACK_REQUEST,
        payload: value
    }
}