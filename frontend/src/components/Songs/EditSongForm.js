import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSong } from '../../store/songs';

const EditSongForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            url,
            description,
            previewImage
        };

        let updatedSong = await dispatch(editSong(songId, payload));
        if (updatedSong) {
            history.push(`/songs/${updatedSong?.id}`);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
    };

    return (
    <div>
        <form onSubmit={handleSubmit} >
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={updateTitle}
                default={title}
            />
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
                default={url}
            />
            <textarea 
                value={description}
                onChange={updateDescription}
                default={description}

            />
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
                default={previewImage}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </div>
    );
    
};

export default EditSongForm;