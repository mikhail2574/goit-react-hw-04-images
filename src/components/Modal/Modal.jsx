import React, { useEffect } from 'react';

const Modal = ({ modal, src, setModal }) => {
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setModal(false);
    }
  }

  useEffect(() => {
    if (modal) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modal]);

  const onClick = () => {
    setModal(false);
  };

  return (
    <>
      {modal ? (
        <div className="Overlay" onClick={onClick}>
          <div className="Modal">
            <img src={src} alt="Not found :(" />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Modal;
