import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import common from './reducers/common-reducer';

const reducer = combineReducers({
    common
});

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);