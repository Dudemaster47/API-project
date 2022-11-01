import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSongInfo } from "../../store/songs";
import Comments from "../Comments";

const SongDetail = () => {
const dispatch = useDispatch();
const { songId } = useParams();
const song = useSelector(state => state.song);

const allSongs = Object.values(song)

useEffect(() => {
    dispatch(getSongInfo(songId));
}, [dispatch, songId]);


if (!song) {
    return null;
}

const singleSong = allSongs.find((song) => {
    if (song.song.id == songId){
    return song;
    }
});

console.log(singleSong, "perhaps butts?")

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
        {singleSong?.song.url}
        <br></br>
        <img src={singleSong?.song.previewImage}></img>
        <br></br>
        <br></br>
        {singleSong?.song && <Comments song = {singleSong?.song} />}
        </div>
    </>
)
}

export default SongDetail;