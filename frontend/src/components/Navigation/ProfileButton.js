import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu} className="profile-menu-button" style={{
        marginLeft: '16px',
        marginRight: '16px',
        border: 'none',
        color: 'white',
        backgroundColor: '#3c3c3c',
        fontSize: '16px',
        cursor: 'pointer',
      }}>
        <i className="fas fa-user-circle" style={{
          display:'inline',
          paddingRight: '4px'
        }}/>
        <div style={{
          display:'inline',
        }}>{user.username}</div>
        <p style={{
          display:'inline',
          paddingLeft: '10px',
        }}>v</p>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout} style={{
              marginLeft: '16px',
              marginRight: '16px',
              border: 'none',
              color: 'white',
              backgroundColor: '#5f5f5f',
              fontSize: '16px',
              cursor: 'pointer'
            }}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;