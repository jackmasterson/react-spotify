import { 
    OPTION_SELECTED,
    API_SUCCESS,
    SAVED_TO_LIB,
    GET_SAVED_TYPE,
    DATA_RETRIEVED
} from '../types/types';
import { makeApiCall, initiateSave, initiateDataGrab } from '../lib/apiServices';
import { artistsSearched } from '../actions/artist-action';
import { tracksSearched } from '../actions/track-action';
import { albumsSearched } from '../actions/album-action';

export const reveal = (type) => {
    return (dispatch) => {
        dispatch(makeSelection(type));
        if (type !== 'search') {
            let t = initiateDataGrab(type);
            // .then (res) ...
            dispatch(dataRetrieved(t));
        }
    }
}

export const getSearch = (name, type) => {
    return (dispatch) => {
        makeApiCall(name, type)
        .then((res) => {
            if (type === 'artist') {
                dispatch(artistsSearched(res));
            } else if (type === 'track') {
                dispatch(tracksSearched(res));
            } else if (type === 'album') {
                dispatch(albumsSearched(res));
            }
            dispatch(responseBack(res));
            dispatch(makeSelection(''));
        });
    }
}

export const saveToDatabase = (type, item) => {
    return (dispatch) => {
        initiateSave(type, item)
        // .then((res) => {
        //     dispatch(itemSaved(res));
        // })

        // should include a response from db when set up
        dispatch(itemSaved());
    }
}

export const getDatabaseData = (type) => {
    return (dispatch) => {
        initiateDataGrab(type);
    }
}

export const makeSelection = (value) => {
    return {
        type: OPTION_SELECTED,
        payload: value
    }
}

export const responseBack = (value) => {
    return {
        type: API_SUCCESS,
        payload: value
    }
}

export const itemSaved = (value) => {
    return {
        type: SAVED_TO_LIB,
        payload: value
    }
}

export const getSavedType = (value) => {
    return {
        type: GET_SAVED_TYPE,
        payload: value
    }
}

export const dataRetrieved = (value) => {
    return {
        type: DATA_RETRIEVED,
        payload: value
    }
}