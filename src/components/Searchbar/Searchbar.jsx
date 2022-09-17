import { Component } from 'react';
import { toast } from 'react-toastify';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChangeValue = event => {
    this.setState({ value: event.target.value.trim() });
  };

  onSubmitValue = ev => {
    ev.preventDefault();

    if (this.state.value === '') {
      return toast('Ведите свой запрос');
    }
    this.props.onSubmit(this.state.value);
  };

  render() {
    const { value } = this.state;
    const { handleChangeValue, onSubmitValue } = this;

    return (
      <header className={style.searchbar}>
        <form className="form" onSubmit={onSubmitValue}>
          <button type="submit" className={style.btn}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus="off"
            name="name"
            value={value}
            placeholder="Search images and photos"
            onChange={handleChangeValue}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
