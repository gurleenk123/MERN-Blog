import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import PostReducer from './reducers/PostReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const combinereducer=combineReducers({
    AuthReducer: AuthReducer,
    PostReducer: PostReducer
})

const middleware=[thunk];
const store=createStore(combinereducer,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
