import style from './Button.module.css';

const Button = ({ onclick }) => {
  return (
    <div className={style.wrapper}>
      <button type="submit" className={style.btn} onClick={onclick}>
        Load more...
      </button>
    </div>
  );
};

export default Button;
