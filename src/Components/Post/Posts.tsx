import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

function decodeJWT(token) {
    const payload = token.split('.')[1]; 
    const decodedPayload = atob(payload);
    
    try {
        const parsedPayload = JSON.parse(decodedPayload);
        const { _id } = parsedPayload; 
        return _id;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
}

function Post() {
    const token = localStorage.getItem('token');
    const userName = decodeJWT(token);
    const [postContent, setPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchUsername, setSearchUsername] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/home');
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile || !postContent) {
            alert('Please select an image file and enter post content');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('description', postContent);

        try {
            const response = await axios.post('http://localhost:3001/upload-image', formData);
            console.log('Image uploaded successfully:', response.data);
            alert('Posted successfully');
            setPostContent(''); // Clear the post content after successful upload
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        }
    };

    const handleSearchPost = () => {
        console.log('Searching posts by username:', searchUsername);
        //setSearchResults([...searchResults, { postId: 1, content: 'Sample post' }]);
    };

    return (
        <div className="container">
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <button
                    onClick={handleBack}
                    className="btn btn-primary"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}
                >
                    <FaArrowLeft style={{ marginRight: '5px' }} /> Back
                </button>
            </div>
            <div className="scroll-box">
                <h2>Create Post</h2>
                <div className="input-group mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Enter your post content"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    className="btn btn-outline-secondary search-button"
                    type="button"
                    onClick={handleUpload}
                >
                    <FaPlus /> Upload Image
                </button>
            </div>
            <div className="scroll-box">
                <h2>Search Posts by Username</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search posts by username"
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary search-button"
                        type="button"
                        onClick={handleSearchPost}
                    >
                        <FaSearch />
                    </button>
                </div>
                <div>
                    {/* Display search results */}
                    {searchResults.map((post) => (
                        <div key={post.postId} className="post-info">
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Post;
