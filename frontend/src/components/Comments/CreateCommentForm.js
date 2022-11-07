import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createComment } from '../../store/comments';


const CreateCommentForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);


    const updateBody = (e) => setBody(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            body
        };

        let createdComment = await dispatch(createComment(songId, payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let foundErrors = Object.values(data.errors);
                setErrors(foundErrors);
            }
        });
        if (createdComment) {
            history.push(`/songs/${createdComment.songId}`);
        }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/songs/${songId}`);

    };

return (
    <div className="form-box">
        <h1 className="header-title">Enter your comment!</h1>
        <form onSubmit={handleSubmit} className="song-form">
            <ul>
                {errors && errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <textarea 
                value={body}
                onChange={updateBody}
                placeholder="Say something!"
                required
            />
            <button type="submit" className="myButton">Submit</button>
            <button type="button" onClick={handleCancelClick} className="myButton">Cancel</button>
        </form>
    </div>
)

}

export default CreateCommentForm;