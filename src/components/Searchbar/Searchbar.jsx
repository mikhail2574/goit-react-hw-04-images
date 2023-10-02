import React, { useState, useEffect } from 'react';
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

  const handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements[1].value.trim();
    if (q === query) {
      return;
    }
    setItems([]);
    setTotal(0);
    setIsLoaderVisible(true);
    setQ(query);
    if (!query) {
      Notiflix.Notify.failure("Don't do it!");
      return;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams({
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      key: KEY,
      q,
    });

    const fetchData = async () => {
      try {
        // Оновлюємо значення q у params перед запитом
        params.set('q', q);
        params.set('page', page);
        // Очищаємо список елементів перед новим запитом

        const resp = await axios.get(`${BASE_URL}?${params}`);
        if (resp.data.total === 0) {
          Notiflix.Notify.failure('Nothing was found for your request');
        }
        setTotal(resp.data.total);
        setItems(prevItems => [...prevItems, ...resp.data.hits]);
        setIsLoaderVisible(false);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (q) {
      fetchData();
    }
  }, [page, q]);

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
      {total !== 0 ? (
        <ImageGallery
          setIsLoaderVisible={setIsLoaderVisible}
          items={items}
          setSrc={setSrc}
          setModal={setModal}
          handleSubmit={handleSubmit}
        />
      ) : (
        ''
      )}

      <Modal src={src} modal={modal} setModal={setModal} />
      {q ? (
        <Button
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
