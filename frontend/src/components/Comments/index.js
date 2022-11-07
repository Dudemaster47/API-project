//create the function that the component consists of
import { getAllComments } from "../../store/comments"
import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteCommentById } from "../../store/comments";
import "./comments.css";

const Comments = ({song}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const comments = useSelector(state => Object.values(state.comment));
    const filteredComments = comments.filter(el => (el.songId === song.id));
    
    const deleteComment = (e, el) => {
        e.preventDefault();
        setErrors([]);

        dispatch(deleteCommentById(el.id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let foundErrors = Object.values(data.errors);
                setErrors(foundErrors);
            };
        });
    };

    useEffect(() => {
        dispatch(getAllComments(song.id))
    }, [id])

    if (!comments) {
        return null;
    }

    return (
        <div>
            
            {filteredComments && filteredComments.map((el) => 
            <div key={el.id} className="comment-box1">
                <ul>
                {errors && errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul>
                <div className="comment-content">
                    <div className="comment-user">{el.User?.username}</div> 
                    <div className="comment-body">{el.body}</div>
                </div>
                <div className="comment-buttons">
                    <Link to={`/comments/${el.id}/edit`}><button className="myButton2">Edit Comment</button></Link>
                    <button className="myButton2" onClick={(e) => deleteComment(e, el)}>Delete Comment</button>
                </div>
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