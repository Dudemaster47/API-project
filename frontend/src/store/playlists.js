import { csrfFetch } from './csrf';

const LOAD_PLAYLISTS = 'albums/loadPlaylists';
const ADD_PLAYLISTS = 'albums/addPlaylists';
const DELETE_PLAYLIST = 'albums/delete{p}laylist'

const loadPlaylists = (playlists) => {
    return {
        type: LOAD_PLAYLISTS,
        payload: playlists
    };
};

const addPlaylists = (playlists) => {
    return {
        type: ADD_PLAYLISTS,
        payload: playlists
    };
};

const deletePlaylist = (id) => {
    return {
        type: DELETE_PLAYLIST,
        id
    };
};

export const getAllPlaylists = () => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists`);

    const data = await response.json();
    // console.log(data)
    dispatch(loadPlaylists(data));
}

export const getPlaylistInfo = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${id}`);

    const data = await response.json();
    dispatch(addPlaylists(data));
}

export const createPlaylist = (playlist) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playlist),
    });

    const data = await response.json();
    console.log(data, "goop");

    dispatch(addPlaylists(data));
    return data;
};

export const editPlaylist = (id, playlist) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playlist),
    });
    const data = await response.json();
    console.log(data, 'goop');
    dispatch(addPlaylists(data));
    return data;
}

export const deletePlaylistById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    dispatch(deletePlaylist(id));
    return data;
}

const initialState = {};

const playlistReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PLAYLISTS:
            newState = {...state};
            console.log(action.payload);
            action.payload.forEach((el) => {
                newState[el.id] = el    
            })
            return newState;
        case ADD_PLAYLISTS:
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
            case DELETE_PLAYLISTS:
                newState = {...state};
                delete newState[action.id];
                return newState;
        default: 
            return state;
    }
}

export default playlistReducer;
