import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

// Define a sample array of posts with images


function Home() {
  const navigate = useNavigate();

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  const handlePostButtonClick = () => {
    navigate('/post');
  };

  return (
    <>
      <Navbar bg="transparent" expand="lg" fixed="top">
        <Navbar.Brand href="#" style={{ fontSize: '24px', color: '#ffffff', marginLeft: '20px' }}>Social</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ms-auto" style={{ marginRight: '20px' }}>
            <li className="nav-item">
              <Link to="#" className="nav-link" style={{ fontSize: '20px', color: '#ffffff', marginRight: '20px' }}>Home</Link>
            </li>
            <li className="nav-item" style={{ marginRight: '20px' }}> {/* Added space here */}
              <button onClick={handlePostButtonClick} className="profile-button" style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#ffffff', position: 'relative' }}>
                Post
                <span className="button-overlay"></span>
              </button>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link" style={{ fontSize: '20px', color: '#ffffff', marginRight: '20px' }}>Search</Link>
            </li>
            <li className="nav-item"> {/* Added space here */}
              <button onClick={handleProfileButtonClick} className="profile-button" style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#ffffff', position: 'relative' }}>
                <FaUser className="profile-icon" />
                Profile
                <span className="button-overlay"></span> 
              </button>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
        <div className="wrapper">
            <h1>Posts</h1>
            <div className="scrollable-container">
                <div className="post-box">
                    <div className="post-content">
                        <h3>Pikkaboo</h3>
                        <img src={'/images/image1.jpg'} alt="Example" />
                        <p>With great power comes great responsibilities</p>
                    </div>
                </div>
            <div className="post-box">
                <div className="post-content">
                    <h3>Raja</h3>
                    <img src={'/images/image2.jpg'} alt="Image" />
                    <p>I am Groot</p>
                </div>
            </div>
        </div>
    </div>

    </>
  );
}

export default Home;
