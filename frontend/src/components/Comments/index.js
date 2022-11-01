//create the function that the component consists of
import { getAllComments } from "../../store/comments"
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Comments = ({song}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comment));
    
    useEffect(() => {
        dispatch(getAllComments(song.id))
    }, [id])

    if (!comments) {
        return null;
    }

    console.log(comments)
    return (
        <>
            {comments && comments.map((el) => <div>{el.User.username} <br></br> {el.body}</div>)}
        </>
    )
}


export default Comments;
//export the function
//slap that bad boy in app
//handle your imports
//set up the thunks
//make it render something useful