import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Inserir tema"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-form__input"
        required
      />
      <button type="submit" className="search-form__button">
        <p className="search-form__button_text">Procurar</p>
      </button>
    </form>
  );
}
