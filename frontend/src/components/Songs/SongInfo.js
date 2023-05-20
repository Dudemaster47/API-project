import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { getSongInfo } from "../../store/songs";
import { deleteSongById } from "../../store/songs";
import Comments from "../Comments";
import AudioPlayer from "../AudioPlayer";
import "./Songs.css";



const SongDetail = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const history = useHistory();
    const song = useSelector(state => state.song);
    const [errors, setErrors] = useState([]);

    const allSongs = Object.values(song)

    const deleteSong = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(deleteSongById(songId)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let foundErrors = Object.values(data.errors);
                setErrors(foundErrors);
            } else {
                history.push(`/`);
            };
        });
        history.push(`/`);
    };

    useEffect(() => {
        dispatch(getSongInfo(songId));
    }, [dispatch, songId]);


    if (!song) {
        return null;
    }

    const singleSong = allSongs.find((song) => {
        // console.log(song.song, "wtf is happening")
        if (song && song.song){
            if (song.song.id == songId){
                return song;
            }
        }
    });
    
    if (singleSong?.album === null){
        singleSong.album = { title: "placeholder album"}
    
    }

    return (
        <div className="song-page">
            <div className="song-top">
                <div className="song-info">
                    <div className="infobox1"><h2>{singleSong?.song.title}</h2></div>
                    <div className="infobox2">{singleSong?.artist.username}</div>
                    <div className="infobox2">In Album: <Link to={`/albums/${singleSong && singleSong.album.id}`}>{singleSong?.album.title}</Link></div>
                    

                </div>

                <div className="audio-player">
                    <AudioPlayer song={singleSong?.song}/>
                </div>

                <img src={singleSong?.song.previewImage} className="info-img"></img>
            </div>
            <div className="song-middle">
                <ul>
                    {errors && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="comment-bar">
                    <Link to={`/songs/${singleSong?.song.id}/comments`}><button className="myButton">Write A Comment...</button></Link>
                </div>
                <div className="option-bar">
                    <Link to={`/songs/${singleSong?.song.id}/edit`}><button className="myButton">Edit Song</button></Link>
                    <button onClick={deleteSong} className="myButton">Delete Song</button>
                </div>
            </div>
            <div className="song-bottom">
                <div className="artist-box">
                    <img src={singleSong?.artist.previewImage} className="artist-img"></img>
                    <div className="artist-name">{singleSong?.artist.username}</div>
                </div>

                <div className="comment-box">
                    <div className="description">{singleSong?.song.description}</div>
                    <div className="comment">{singleSong?.song && <Comments song={singleSong?.song} />}</div>
                </div>
            </div>
        </div>
    )
}

export default SongDetail;