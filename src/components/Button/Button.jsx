const Button = ({ setPage }) => {
  const onClick = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
