import { OPTION_SELECTED, API_SUCCESS, DATA_RETRIEVED } from '../types/types';
const initialState = [{selected: 'search'}];

export default (state = initialState, action) => {
    switch (action.type) {
        case API_SUCCESS:
            return {...state, response: action.payload}
        case OPTION_SELECTED:
            return {...state, selected: action.payload}
        case DATA_RETRIEVED:
            return {...state, retrieved: action.payload}    
        default:
            return {...state}
    }
}