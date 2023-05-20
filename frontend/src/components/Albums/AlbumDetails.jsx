//this displays an album's specific info
import { getAllAlbums } from "../../store/albums";
import { getAlbumInfo } from "../../store/albums";
import { getAllSongs } from "../../store/songs";
import { deleteAlbumById } from "../../store/albums";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./album.css"



const AlbumDetails = () => {
    const dispatch = useDispatch();
    const {albumId} = useParams();
    const history = useHistory();
    const album = useSelector(state => state.album);
    const song = useSelector(state => state.song);
    const sessionUser = useSelector(state => state.session.user)
    // const artist = useSelector(state => state.user)
    const [errors, setErrors] = useState([]);

    const allAlbums = Object.values(album);
    const allSongs = Object.values(song);
    // const allArtists = Object.values(artist);

    const deleteAlbum = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(deleteAlbumById(albumId)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let foundErrors = Object.values(data.errors);
                setErrors(foundErrors);
            } else {
                history.push(`/`)
            };
        });
        history.push(`/`);
    };

    useEffect(() => {
        dispatch(getAllAlbums);
        dispatch(getAllSongs);
        dispatch(getAlbumInfo(albumId));
    }, [dispatch]);

    if (!album) {
        return null;
    }

    const singleAlbum = allAlbums.find(album => album.id == albumId);

    const albumSongs = allSongs.filter(song => song.albumId == albumId);

    const allAlbumInfo = allAlbums.find(album => album.artist);

    return (
        <div className="albumWrapper">
            <div className="album-box">
                <div className="album-top">
                    <img className="albumPic" src={singleAlbum && singleAlbum.previewImage} />
                    <div className="infoBox">
                        <div className="albumInfo1"><h2>{singleAlbum && singleAlbum.title}</h2></div>
                        <div className="albumInfo2"><h2>{allAlbumInfo && allAlbumInfo.artist.username}</h2></div>
                        <div className="song-list">
                            {albumSongs && albumSongs.map((el) =>
                            <Link key={el.id} to={`/songs/${el.id}`} style={{textDecoration: "none"}}>
                                {el.title}
                            </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="optionList-outer">
                        {(sessionUser && allAlbumInfo && sessionUser.id === allAlbumInfo.artist.id) ? (
                            <div className="optionList-inner">
                                    <button className="myButton">EDIT ALBUM INFO</button>
                                    <button className="myButton">ADD/MOVE SONGS</button>
                                    <button onClick={deleteAlbum} className="myButton">DELETE ALBUM</button>
                            </div>
                        ) : null}
                </div>
            </div>
        </div>
    )
}

export default AlbumDetails