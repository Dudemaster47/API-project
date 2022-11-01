import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/loadSongs';
const ADD_SONGS = 'songs/addSongs';
const DELETE_SONGS = 'songs/deleteSongs';


const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        payload: songs
    };
};

const addSongs = (songs) => {
    return {
        type: ADD_SONGS,
        payload: songs
    }
}

export const getAllSongs = () => async (dispatch) => {
    const response = await csrfFetch(`/api/songs`);

    const data = await response.json();
    // console.log(data)
    dispatch(loadSongs(data));
}

export const getSongInfo = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}`);

    const data = await response.json();
    console.log(data);
    dispatch(addSongs(data));
}

export const createSong = (song) => async dispatch => {
    const response = await csrfFetch(`/api/songs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
    });

    const data = await response.json();
    console.log(data);

    dispatch(addSongs(data));
    return data;
};

export const editSong = (id, song) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
    });
    const data = await response.json();
    console.log(data);
    dispatch(addSong(data));
    return data;
}

const initialState = {};

const songReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SONGS:
            newState = {...state};
            console.log(action.payload);
            action.payload.forEach((el) => {
                newState[el.id] = el    
            })
            return newState;
        case ADD_SONGS:
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
        default: 
            return state;
    }
}

export default songReducer;