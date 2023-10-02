import React, { useEffect } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, setSrc, setModal, setIsLoaderVisible }) => {
  console.log(items);
  useEffect(() => {
    if (items && items.length > 0) {
      document.querySelector('.ImageGallery').style.display = 'grid';
      setIsLoaderVisible(false);
    }
  }, [items, setIsLoaderVisible]);

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
