import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{
        marginLeft: '16px',
        marginRight: '16px',
        border: 'none',
        color: 'white',
        backgroundColor: '#3c3c3c',
        fontSize: '16px',
        cursor: 'pointer'

      }}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;