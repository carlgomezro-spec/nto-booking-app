import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Aquí llamarías a tu API con query
    console.log("Buscar:", query);
    setResults([]); // reemplaza con resultados reales
  };

  return (
    <div>
      <h1>Search Tattoos</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a tattoo"
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results">
        {results.length === 0 ? (
          <p>No results</p>
        ) : (
          results.map((item) => <p key={item.id}>{item.name}</p>)
        )}
      </div>
    </div>
  );
};

export default Search;
