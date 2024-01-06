import { Component, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
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
          onChange={handleChange}
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
