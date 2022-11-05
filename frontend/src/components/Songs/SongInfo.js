import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
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
                <div>{singleSong?.song.title}</div>
           
                <div>{singleSong?.album.title}</div>
         
                <div>{singleSong?.artist.username}</div>

                <div>{singleSong?.song.description}</div>

                <img src={singleSong?.song.previewImage}></img>

                <AudioPlayer song={singleSong?.song}/>

                <div>
                    <Link to={`/songs/${singleSong?.song.id}/edit`}><button>Edit</button></Link>
                    <Link to={`/songs/${singleSong?.song.id}/comments`}><button>Comment</button></Link>
                    <button onClick={deleteSong}>Delete</button>
                </div>

                <div>
                    {singleSong?.song && <Comments song={singleSong?.song} />}
                </div>
            </div>
        </>
    )
}

export default SongDetail;