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

const addComments = (comment) => {
    return {
        type: ADD_COMMENTS,
        payload: comment
    };
};

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENTS,
        id
    };
};

export const getAllComments = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}/comments`);

    const data = await response.json();
    console.log(data);
    dispatch(loadComments(data, id));
};

export const createComment = (id, comment) => async (dispatch) => {
    console.log(comment, "thinking emoji")
    const response = await csrfFetch(`/api/songs/${id}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    const data = await response.json();
    console.log(data);
    dispatch(addComments(data));
    return data;
};

export const editComment = (id, comment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });

    const data = await response.json();
    console.log(data);
    dispatch(addComments(data));
    return data
};

export const deleteCommentById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    dispatch(deleteComment(id));
    return data;
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENTS:
            const newComments = {...state};
            action.payload.forEach((el) => {
                newComments[el.id] = el;
            });
            return newComments;
            
        case ADD_COMMENTS:
            if (!state[action.payload.id]) {
                const newState = {
                    ...state,
                    [action.payload.id]: action.payload
                };
                // const songList = newState.list.map(id => newState[id]);
                // songList.push(action.payload);
                return newState;
            }
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    ...action.payload
                }
            };
        case DELETE_COMMENTS:
            newState = {...state};
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}

export default commentReducer;

