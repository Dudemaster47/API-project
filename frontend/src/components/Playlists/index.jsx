//this displays all of the current user's playlists

import { getAllPlaylists } from "../../store/playlists";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

const Playlists = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(state => Object.values(state.playlist));

    useEffect(() => {
        dispatch(getAllPlaylists());
    }, [dispatch]);

    const filteredPlaylists = playlists.filter((el) => el.userId === sessionUser.id);

    return (
        <>
            <div className="albumList-header">
                <h1>{sessionUser.username}'s Playlists!!</h1>
            </div>
            <div>
                <p>insert user's album/playlist/song list component here</p>
            </div>
            {filteredPlaylists && filteredPlaylists.map((el) =>
            <div className="albumList-albumBox">
                <p>playlist image</p>
                <p>{el.title}</p>
                <p>don't feel ambitious enough for tracks here. these are all links</p>
                <button>edit playlist</button>
                <button>delete playlist</button>
            </div>
            )}
        </>
    )
};

export default Playlists;