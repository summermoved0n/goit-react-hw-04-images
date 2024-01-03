import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.resetSubmit();
  };

  resetSubmit = () => {
    this.setState({
      input: '',
    });
  };

  render() {
    const { input } = this.state;
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          {input === '' ? (
            <button type="submit" className={css.SearchForm_button} disabled>
              <span>
                <FaSearch />
              </span>
            </button>
          ) : (
            <button type="submit" className={css.SearchForm_button}>
              <span>
                <FaSearch />
              </span>
            </button>
          )}
          <input
            onChange={this.handleChange}
            className={css.SearchForm_input}
            type="text"
            value={input}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
