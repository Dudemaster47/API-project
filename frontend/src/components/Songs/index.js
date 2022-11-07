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

    const filteredSongs = songs.filter((el) => el.id);

    return ( 
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
    )
}

export default Songs;