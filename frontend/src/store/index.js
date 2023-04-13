import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import songReducer from './songs';
import commentReducer from './comments';
import playerReducer from './player';
import albumReducer from './albums';
import playlistReducer from './playlists'

const rootReducer = combineReducers({
  session: sessionReducer,
  song: songReducer,
  comment: commentReducer,
  player: playerReducer,
  album: albumReducer,
  playlist: playlistReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };


  export default configureStore;