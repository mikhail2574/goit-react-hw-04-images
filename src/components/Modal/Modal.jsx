const Modal = ({ modal, src, setModal }) => {
  if (!modal) {
    return;
  }

  const onClick = () => {
    setModal(false);
  };

  return (
    <div className="Overlay" onClick={onClick}>
      <div className="Modal">
        <img src={src} alt="Not found :(" />
      </div>
    </div>
  );
};

export default Modal;
