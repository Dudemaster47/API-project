import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editAlbum } from '../../store/albums';
import '../Songs/Songs.css'

const EditAlbumForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const payload = {
            title,
            description,
            previewImage
        };

        let updatedAlbum = await dispatch(editAlbum(albumId, payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let foundErrors = Object.values(data.errors);
                setErrors(foundErrors);
            }
        });
        if (updatedAlbum) {
            history.push(`/albums/${updatedAlbum?.id}`);
        }
        
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/albums/${albumId}`);
    };

    return (
        <div className="form-box">
        <h1 className="header-title">Edit Your Album Info!</h1>

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
}

export default EditAlbumForm;