import { OPTION_SELECTED } from '../types';

export const makeSelection = (value) => {
    return {
        type: OPTION_SELECTED,
        payload: value
    }
}