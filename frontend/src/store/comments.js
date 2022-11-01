import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comments/loadComments'
const ADD_COMMENTS = 'comments/addComments'
const DELETE_COMMENTS = 'songs/deleteComments'

const loadComments = (comments, songId) => {
    return {
        type: LOAD_COMMENTS,
        payload: comments,
        songId
        
    };
};

export const getAllComments = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}/comments`);

    const data = await response.json();
    console.log(data);
    dispatch(loadComments(data, id));
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENTS:
            newState = {...state};
            action.payload.forEach((el) => {
                newState[el.id] = el
            });
            return newState;
        default:
            return state;
    }
}

export default commentReducer;

