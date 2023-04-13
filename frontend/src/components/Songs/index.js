import { getAllSongs} from "../../store/songs";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Songs.css"



const Songs = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => Object.values(state.song));
    const albums = useSelector(state => Object.values(state.album))
    useEffect(() => {
        dispatch(getAllSongs());
        dispatch(getAllAlbums());
        dispatch(getAllPlaylists());
    }, [dispatch])

    const filteredSongs = songs.filter((el) => el.id);
    const filteredAlbums = albums.filter((el) => el.id);

    return ( 
        <div>
            <h2 className="home-header">Fresh Pressed Songs</h2>
            <div className="songcontainer">
                {filteredSongs && filteredSongs.map((el) => 
                <div className="songlink">
                    <Link key={el.id} to={`/songs/${el.id}`} style={{textDecoration: "none"}}>
                        <div key={el.id} className="songbox">
                        <img className="home-img" src={el.previewImage} />
                        <h3 className="home-title">{el.title}</h3>
                        </div>
                    </Link>
                </div>)}
            </div>
            <h2 className="home-header">Check Out These Albums!</h2>
            <div className="songcontainer">
                {filteredAlbums && filteredAlbums.map((el) =>
                <div className="songlink">
                    <Link key={el.id} to={`/albums/${el.id}`} style={{textDecoration: "none"}}>
                        <div key={el.id} className="songbox">
                            <img className="home-img" src={el.previewImage} />
                            <h3 className="home-title">{el.title}</h3>
                        </div>
                    </Link>
                </div>)}
            </div>
        </div>
    )
}

export default Songs;