import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSong } from '../../store/songs';

const CreateSongForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);

    const handleSubmint = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            url,
            description,
            imageUrl
        };

        let createdSong = await dispatch(createSong(payload));
        if (createdSong) {
            history.push(`/song/${createdSong.id}`);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} >
            <input 
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={updateTitle}
            />
            <label for="song">Upload a song file</label>
            <input
                type="file"
                id="song"
                accept="audio/*"
                value={url}
                onChange={updateUrl}
            />
            <textArea 
                value={description}
                onChange={updateDescription}
                placeholer="Enter description"
            />
            <label for="img">Upload a song file</label>
            <input
                type="file"
                id="img"
                accept="img/*"
                value={imageUrl}
                onChange={updateImageUrl}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )
    
}

export default CreateSongForm;