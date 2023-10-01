import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, id, tags, largesrc, setSrc, setModal }) => {
  const imageClicked = evt => {
    setSrc(evt.target.dataset.largesrc);
    setModal(true);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={tags}
        id={id}
        onClick={imageClicked}
        data-largesrc={largesrc}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  id: PropTypes.number,
  tags: PropTypes.string,
  largesrc: PropTypes.string,
  setSrc: PropTypes.func,
  setModal: PropTypes.func,
};
