import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, setSrc, setModal }) => {
  return (
    <>
      {
        <ul className="ImageGallery">
          {items.map(item => (
            <ImageGalleryItem
              src={item.webformatURL}
              key={item.id}
              tags={item.tags}
              largesrc={item.webformatURL}
              setSrc={setSrc}
              setModal={setModal}
            />
          ))}
        </ul>
      }
    </>
  );
};

export default ImageGallery;
