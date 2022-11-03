import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSongInfo } from "../../store/songs";
import { deleteSongById } from "../../store/songs";
import Comments from "../Comments";
import AudioPlayer from "../AudioPlayer";


const SongDetail = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const history = useHistory();
    const song = useSelector(state => state.song);

    const allSongs = Object.values(song)

    const deleteSong = (e) => {
        e.preventDefault();

        dispatch(deleteSongById(songId));
        history.push(`/songs/`);
        
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
        <>
            <div>
            {singleSong?.song.title}
            <br></br>
            {singleSong?.album.title}
            <br></br>
            {singleSong?.artist.username}
            <br></br>
            <br></br>
            {singleSong?.song.description}
            <br></br>
            <img src={singleSong?.song.previewImage}></img>
            <br></br>
            <br></br>
            {singleSong?.song && <Comments song={singleSong?.song} />}
            <br></br>
            <AudioPlayer song={singleSong?.song}/>
            <br></br>
            <button onClick={deleteSong}>Delete</button>
            </div>
        </>
    )
}

export default SongDetail;