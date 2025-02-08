import { useState } from "react";

export default function SearchBar({ handleSearch, setIsPreLoader, setIsResult }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPreLoader(true);
    setIsResult(null);
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Insert topic here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-form__input"
        required
      />
      <button type="submit" className="search-form__button">
        <p className="search-form__button_text">Search</p>
      </button>
    </form>
  );
}