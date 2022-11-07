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
      <ProfileButton user={sessionUser} className="prof-button" />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink exact to="/signup" style={({ isActive }) => ({
              color: '#fff',
              background: '#3c3c3c',
              textDecoration: 'none',
              marginLeft: '32px',
              marginRight: '16px',
            })}>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="navbar">
      <li className="barlink">
        <NavLink exact to="/"><img src={navbarIcon} className="navImage" /></NavLink>
      </li>
      <li className="barlink">
        <NavLink exact to="/" style={({ isActive }) => ({
              color: '#fff',
              background: '#3c3c3c',
              textDecoration: 'none',
            })}>Home</NavLink>
      </li>
      <li className="barlink">
        <NavLink exact to="/songs/new" style={({ isActive }) => ({
          color: '#fff',
          background: '#3c3c3c',
          textDecoration: 'none',
        })}>Upload</NavLink>
      </li>
        <li className="barlink2">
          {isLoaded && sessionLinks}
        </li>
      <li className="barlink">
            <a href="https://github.com/Dudemaster47/API-project/tree/master" className="about">
              About
            </a>
      </li>
    </ul>
  );
}

export default Navigation;