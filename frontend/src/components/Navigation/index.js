// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import navbarIcon from './navbar_icon.jpg';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="navbar">
      <li className="barlink">
        {/* <NavLink exact to="/"><img src={navbarIcon} className={navImage} /></NavLink> */}
        Nav Icon
      </li>
      <li className="barlink">
        <NavLink exact to="/" style={({ isActive }) => ({
              color: '#fff',
              background: isActive ? '#616161' : '#424242',
            })}>Home</NavLink>
      </li>
      <li className="barlink">
        {isLoaded && sessionLinks}
      </li>
      <li className="barlink">
        <NavLink exact to="/songs/new" style={({ isActive }) => ({
              color: '#fff',
              background: isActive ? '#616161' : '#424242',
            })}>Upload</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;