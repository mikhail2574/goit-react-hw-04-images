import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ modal, src, setModal }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        setModal(false);
      }
    },
    [setModal]
  );

  useEffect(() => {
    const onKeyDown = e => handleKeyDown(e);

    if (modal) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modal, handleKeyDown]);

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

Modal.propTypes = {
  modal: PropTypes.string,
  src: PropTypes.bool,
  setModal: PropTypes.func,
};
