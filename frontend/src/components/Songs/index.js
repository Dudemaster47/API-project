import { getAllSongs} from "../../store/songs";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Songs.css"



const Songs = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => Object.values(state.song));
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])

    return ( 
        <>
            {songs && songs.map((el) => 
            <div className="songlink">
                <Link key={el.id} to={`/songs/${el.id}`}>
                    <div>{el.title}</div>
                    <img src={el.previewImage} />
                </Link>
            </div>)}
        </>
    )
}

export default Songs;