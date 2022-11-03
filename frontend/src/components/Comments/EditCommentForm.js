import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editComment } from '../../store/comments';

const EditCommentForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { commentId } = useParams();
    const [body, setBody] = useState('');
    const [songId, setSongId] = useState('');

    const updateBody = (e) => setBody(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body
        };
        
        let updatedComment = await dispatch(editComment(commentId, payload));
        if (updatedComment) {
            history.push(`/songs/${updatedComment.songId}`);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
    };
    
    return (
        
        <div>
            <form onSubmit={handleSubmit} >
                <label htmlFor="bodytext">Enter your comment</label>
                <textarea 
                    value={body}
                    onChange={updateBody}
                    placeholder={body}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    )
}

export default EditCommentForm;