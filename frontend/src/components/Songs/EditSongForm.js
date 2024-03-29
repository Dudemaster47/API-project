import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSong } from '../../store/songs';

// i can alter this to make it possible to add a song to an existing album
// shouldn't be too hard
// albeit shitty UI but honestly that's
// ...oh. right.
// i can't cannibalize that for playlists :/
// i don't think i can regardless so i'll have to figure that one out
// but for this i can just. filter the albums to just those owned by
// the user, and use a select list.
// easy enough i just don't have much in me today :/

const EditSongForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const [albumId, setAlbumId] = useState('')
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);

    const updateAlbumId = (e) => setAlbumId(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const payload = {
            albumId,
            title,
            url,
            description,
            previewImage
        };

        let updatedSong = await dispatch(editSong(songId, payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let foundErrors = Object.values(data.errors);
                setErrors(foundErrors);
            }
        });
        if (updatedSong) {
            history.push(`/songs/${updatedSong?.id}`);
        }
        
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/songs/${songId}`);
    };

    return (
        <div className="form-box">
        <h1 className="header-title">Edit Your Song!</h1>

        <form onSubmit={handleSubmit} className="song-form">
            <ul>
                {errors && errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="form-item">
                <input 
                    type="text"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={updateTitle}
                
                />
            </div>
            <div className="form-item">
                <label htmlFor="song">Upload a song file</label>
                {/* <input
                    type="file"
                    id="song"
                    accept="audio/*"
                    value={url}
                    onChange={updateUrl}
                /> */}
                <input 
                    type="text"
                    placeholder="Song"
                    required
                    value={url}
                    onChange={updateUrl}
                />
            </div>
            <div className="form-item">
                <textarea 
                    value={description}
                    onChange={updateDescription}
                    placeholder="Enter description"
                    required
                />
            </div>
            <div className="form-item">
            <label htmlFor="img">Upload an image file</label>
                {/* <input
                    type="file"
                    id="img"
                    accept="img/*"
                    value={previewImage}
                    onChange={updatePreviewImage}
                /> */}
                <input 
                    type="text"
                    placeholder="Image"
                    required
                    value={previewImage}
                    onChange={updatePreviewImage}
                />
            </div>
            <div className="form-buttons">
            <button type="submit" className="myButton">Submit</button>
            <button type="button" onClick={handleCancelClick} className="myButton">Cancel</button>
            </div>
        </form>
    </div>
    );
    
};

export default EditSongForm;