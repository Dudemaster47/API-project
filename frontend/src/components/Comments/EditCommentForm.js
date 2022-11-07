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
    const [errors, setErrors] = useState([]);

    const updateBody = (e) => setBody(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body
        };
        
        let updatedComment = await dispatch(editComment(commentId, payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let foundErrors = Object.values(data.errors);
                setErrors(foundErrors);
            }
        });
        if (updatedComment) {
            history.push(`/songs/${updatedComment.songId}`);
        };

        setErrors([]);
       
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/songs/${songId}`);
    };
    
    return (
        
        <div>
            <div className="form-box">
                <h1 className="header-title">Edit your comment!</h1>
                <form onSubmit={handleSubmit} className="song-form">
                    <ul>
                    {errors && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                    </ul>
                    <textarea 
                        value={body}
                        onChange={updateBody}
                        placeholder="I can't get this to populate right and don't have the time or energy left to figure out how to do it"
                        required
                    />
                    <button type="submit" className="myButton">Submit</button>
                    <button type="button" onClick={handleCancelClick} className="myButton">Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default EditCommentForm;