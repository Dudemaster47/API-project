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
import "./album.css"
import "../Songs/Songs.css"


const Albums = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => Object.values(state.album));

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [dispatch])

    const filteredAlbums = albums.filter((el) => el.userId === sessionUser.id);

    return (
        <div className="albumHome">
            <div className="albumList-header">
                <h1>{sessionUser.username}'s Albums!!</h1>
            </div>
            <div>
                <p>insert user's album/playlist/song list component here</p>
            </div>
            {filteredAlbums && filteredAlbums.map((el) =>
            <div className="songLink">
                <Link className="albumList-albumBox" to={`/albums/${el.id}`} style={{textDecoration: "none"}}>
                    <div key={el.id} className="songbox">
                        <img src={el.previewImage} className="home-img"/>
                        <h3 className="home-title">{el.title}</h3>
                    </div>
                </Link>
            </div>
            )}
            <Link className="buttonBox" to={`/albums/new`}>
                <button className="myButton">Create Album</button>
            </Link>
        </div>
    )
}

export default Albums;