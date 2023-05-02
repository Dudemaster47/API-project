import { csrfFetch } from './csrf';

const LOAD_ALBUMS = 'albums/loadAlbums';
const ADD_ALBUMS = 'albums/addAlbums';
const DELETE_ALBUM = 'albums/deleteAlbum'

const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        payload: albums
    };
};

const addAlbums = (albums) => {
    return {
        type: ADD_ALBUMS,
        payload: albums
    };
};

const deleteAlbum = (id) => {
    return {
        type: DELETE_ALBUM,
        id
    };
};

export const getAllAlbums = () => async (dispatch) => {
    const response = await csrfFetch(`/api/albums`);

    const data = await response.json();
    // console.log(data)
    dispatch(loadAlbums(data));
}

export const getAlbumInfo = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${id}`);

    const data = await response.json();
    dispatch(addAlbums(data));
}

export const createAlbum = (album) => async dispatch => {
    const response = await csrfFetch(`/api/albums/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
    });

    const data = await response.json();
    console.log(data, "goop");

    dispatch(addAlbums(data));
    return data;
};

export const editAlbum = (id, album) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
    });
    const data = await response.json();
    console.log(data, 'goop');
    dispatch(addAlbums(data));
    return data;
}

export const deleteAlbumById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    dispatch(deleteAlbum(id));
    return data;
}

const initialState = {};

const albumReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALBUMS:
            newState = {...state};
            action.payload.forEach((el) => {
                newState[el.id] = el    
            })
            return newState;
        case ADD_ALBUMS:
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
            case DELETE_ALBUM:
                newState = {...state};
                delete newState[action.id];
                return newState;
        default: 
            return state;
    }
}

export default albumReducer;