import { useState } from "react";
import api_news from "../utils/api_news";
import trash from '../images/trash.png';

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

// import api_news from "./apiNews"; // Importa a instância da API

// // Palavra-chave para a pesquisa
// const keyword = "cake";

// // Chamando a API para buscar notícias
// api_news.newsSearch(keyword)
//     .then((data) => {
//         console.log("Notícias encontradas:", data.articles);
//     })
//     .catch((error) => {
//         console.error("Erro ao buscar notícias:", error);
//     });

