const Button = ({ items, page, setPage, total }) => {
  const onClick = () => {
    setPage(page + 1);
    console.log(items);
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
