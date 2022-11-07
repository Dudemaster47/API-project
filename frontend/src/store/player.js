import { csrfFetch } from "./csrf";

const LOAD_AUDIO = 'player/loadAudio';
const ADD_AUDIO = 'player/addAudio';

const initialState = {}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    };
};

export default playerReducer;