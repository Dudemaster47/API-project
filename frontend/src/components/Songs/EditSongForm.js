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
    const [imageUrl, setImageUrl] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            url,
            description,
            imageUrl
        };

        console.log(payload, "this looks fine???");
        let updatedSong = await dispatch(editSong(songId, payload));
        console.log(updatedSong, "huh????");
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
            />
            <label htmlFor="song">Upload a song file</label>
            <input
                type="file"
                id="song"
                accept="audio/*"
                value={url}
                onChange={updateUrl}
            />
            {/* <input 
                type="text"
                placeholder="Song"
                required
                value={url}
                onChange={updateUrl}
            /> */}
            <textarea 
                value={description}
                onChange={updateDescription}
                placeholder="Enter description"
            />
            <label htmlFor="img">Upload an image file</label>
            <input
                type="file"
                id="img"
                accept="img/*"
                value={imageUrl}
                onChange={updateImageUrl}
            />
            {/* <input 
                type="text"
                placeholder="Image"
                required
                value={imageUrl}
                onChange={updateImageUrl}
            /> */}
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </div>
    );
    
};

export default EditSongForm;