import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import albums from './reducers/album-reducer';
import artists from './reducers/artist-reducer';
import tracks from './reducers/track-reducer';
import queried from './reducers/query-reducer';

const reducer = combineReducers({
    albums,
    artists,
    tracks,
    queried,
});

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);