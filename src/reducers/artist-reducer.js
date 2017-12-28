import { ARTIST_REQUEST } from '../types/types';
const initialState = [{}];

export default (state = initialState, action) => {
    switch (action.type) {
        case ARTIST_REQUEST:
            return {...action.payload}
        default:
            return {...state}
    }
}