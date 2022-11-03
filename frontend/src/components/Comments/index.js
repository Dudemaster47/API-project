//create the function that the component consists of
import { getAllComments } from "../../store/comments"
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteCommentById } from "../../store/comments";

const Comments = ({song}) => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const comments = useSelector(state => Object.values(state.comment));
    
    const deleteComment = (e, el) => {
        e.preventDefault();
        
        dispatch(deleteCommentById(el.id));
        
    };

    useEffect(() => {
        dispatch(getAllComments(song.id))
    }, [id])

    if (!comments) {
        return null;
    }

    return (
        <div>
            {comments && comments.map((el) => 
            <div key={el.id}>
            {el.User?.username} 
            <br></br> 
            {el.body}
            <br></br>
            <button onClick={(e) => deleteComment(e, el)}>DELETE</button>
            </div>
            )}
        </div>
    )
}


export default Comments;
//export the function
//slap that bad boy in app
//handle your imports
//set up the thunks
//make it render something useful