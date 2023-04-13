import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";


const SongsList = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector(state => Object.values(state.song));

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])

    const filteredSongs = songs.filter((el) => el.userId === sessionUser.id);

    return (
        <>
            <div className="albumList-header">
                <h1>{sessionUser.username}'s Songs!!</h1>
            </div>
            <div>
                <p>insert user's album/playlist/song list component here</p>
            </div>
            {filteredSongs && filteredSongs.map((el) =>
            <div className="albumList-albumBox">
                <p>song image</p>
                <p>{el.title}</p>
                <p>don't feel ambitious enough for tracks here. these are all links</p>
                <button>edit song</button>
                <button>delete song</button>
            </div>
            )}
        </>
    )
}

export default SongsList;