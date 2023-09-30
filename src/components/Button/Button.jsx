import axios from 'axios';

const Button = ({ setItems, items, page, setPage, q, total }) => {
  const KEY = '38966446-c32fc19d0a971996be7b08c24';
  const BASE_URL = `https://pixabay.com/api/`;
  const params = new URLSearchParams({
    page: page + 1,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    key: KEY,
    q: q,
  });

  const onClick = () => {
    setPage(page + 1);
    async function fetchItems() {
      return await axios.get(`${BASE_URL}?${params}`).then(resp => {
        setItems([...items, ...resp.data.hits]);
      });
    }
    console.log(total);
    fetchItems();
  };

  return (
    <>
      {total >= page * 12 ? (
        <button className="Button" type="button" onClick={onClick}>
          Load more
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default Button;
