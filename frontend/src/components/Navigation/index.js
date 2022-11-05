// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import navbarIcon from '../../images/navbar_icon.jpg'
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
    <ul>
      <li>
        {/* <NavLink exact to="/"><img src={navbarIcon} className={navImage} /></NavLink> */}
        Nav Icon goes here but it's too big to deal with pre styling lol
      </li>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      <li>
        {isLoaded && sessionLinks}
      </li>
      <li>
        <NavLink exact to="/songs/new">Upload</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;