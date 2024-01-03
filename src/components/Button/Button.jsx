import css from './Button.module.css';

export const Button = ({ onLoad }) => {
  return (
    <button className={css.Button} type="button" onClick={onLoad}>
      Load more
    </button>
  );
};
