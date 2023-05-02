//for listing all albums of the current user
//should there be a component for all albums of a specific user?
//PROBABLY. 
// link to this is in the user dropdown
//hrm.
//ugh i don't care enough. not gonna have this balloon. it will suck but whatever.

import { getAllAlbums } from "../../store/albums";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

const Albums = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => Object.values(state.album));

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [dispatch])

    const filteredAlbums = albums.filter((el) => el.userId === sessionUser.id);

    return (
        <>
            <div className="albumList-header">
                <h1>{sessionUser.username}'s Albums!!</h1>
            </div>
            <div>
                <p>insert user's album/playlist/song list component here</p>
            </div>
            {filteredAlbums && filteredAlbums.map((el) =>
            <div className="albumList-albumBox">
                <p>album image</p>
                <p>{el.title}</p>
                <p>don't feel ambitious enough for tracks here. these are all links</p>
                <button>edit album</button>
                <button>delete album</button>
            </div>
            )}
        </>
    )
}

export default Albums;