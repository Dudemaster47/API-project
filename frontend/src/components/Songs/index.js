import { getAllSongs} from "../../store/songs";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";



const Songs = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => Object.values(state.song));
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])

    return ( 
        <>
            {songs && songs.map((el) => <div>{el.title}</div>)}
        </>
    )
}

export default Songs;