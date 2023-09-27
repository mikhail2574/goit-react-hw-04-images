import { useState } from 'react';
import axios from 'axios';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Notiflix from 'notiflix';
import { FidgetSpinner } from 'react-loader-spinner';

const SearchBar = () => {
  const KEY = '38966446-c32fc19d0a971996be7b08c24';
  const BASE_URL = `https://pixabay.com/api/`;
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState('');
  const [src, setSrc] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [total, setTotal] = useState(0);
  const [IsLoaderVisible, setIsLoaderVisible] = useState(false);
  const params = new URLSearchParams({
    page: 1,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    key: KEY,
    q: q,
  });
  const handleSubmit = async evt => {
    setIsLoaderVisible(true);
    document.querySelector('.ImageGallery').style.display = 'none';
    evt.preventDefault();
    setQ(evt.target.elements[1].value.trim());
    params.set('q', evt.target.elements[1].value.trim());
    if (!evt.target.elements[1].value.trim()) {
      Notiflix.Notify.failure('Noo');
      return;
    } else {
      setItems(
        await axios.get(`${BASE_URL}?${params}`).then(resp => {
          if (resp.data.total === 0) {
            Notiflix.Notify.failure('Nothing was fo und for your request');
          }
          setTotal(resp.data.total);
          if (total <= page * 12) {
            document.querySelector('.Button').style.display = 'none';
          } else {
            document.querySelector('.Button').style.display = 'block';
          }
          return resp.data.hits;
        })
      );
    }
  };

  return (
    <>
      <header className="searchbar">
        <form className="searchForm" onSubmit={handleSubmit}>
          <button type="submit" className="searchForm-button">
            <span className="SearchFormButtonLabel">Search</span>
          </button>
          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      <ImageGallery
        setIsLoaderVisible={setIsLoaderVisible}
        items={items}
        setSrc={setSrc}
        setModal={setModal}
        handleSubmit={handleSubmit}
      />
      <Modal src={src} modal={modal} setModal={setModal} />
      {q ? (
        <Button
          setItems={setItems}
          page={page}
          setPage={setPage}
          items={items}
          q={q}
          total={total}
        />
      ) : (
        ''
      )}
      <FidgetSpinner
        visible={IsLoaderVisible}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#F4442E"
      />
    </>
  );
};

export default SearchBar;
