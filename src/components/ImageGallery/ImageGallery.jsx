import React, { useEffect, useState } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, setSrc, setModal, setIsLoaderVisible }) => {
  const [galleryVisible, setGalleryVisible] = useState(false);

  useEffect(() => {
    if (items && items.length > 0) {
      document.querySelector('.ImageGallery').style.display = 'grid';
      setIsLoaderVisible(false);
    }
  }, [items, setIsLoaderVisible]);

  return (
    <ul className={`ImageGallery ${galleryVisible ? 'visible' : 'hidden'}`}>
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
  );
};

export default ImageGallery;
