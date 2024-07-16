/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{useState}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import GCLogo from '../Assets/images/GC-full-logo.png';
import userLogo from '../Assets/images/user.png'
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = ({handleSearch}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    
  <nav className="navbar navbar-light nv-bar">
    <Link to='/'><img src={GCLogo} alt="Gecimmo logo" className='GC-logo'/></Link>
    <div className="d-flex">
    <input className="form-control mr-2 flex-grow-1" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{handleSearch(e.target.value)}}/>

    { /* <button className="btn btn-outline-primary" type="submit">Search</button> */}
      <div className="custom-btn-group">
      <button
        type="button"
        className="custom-dropdown-toggle"
        onClick={toggleDropdown}
      >
        <img src={userLogo} alt="user" className='user-logo'/>
      </button>
      {isOpen && (
        <div className="custom-dropdown-menu">
          <a className="custom-dropdown-item" href="#">Calendrier</a>
          <a className="custom-dropdown-item" href="#">Action</a>
          <div className="custom-dropdown-divider"></div>
          <a className="custom-dropdown-item" href="#">Déconnexion</a>
        </div>
      )}
    </div>
    </div>
  </nav>
    
  )
}

export default NavBar