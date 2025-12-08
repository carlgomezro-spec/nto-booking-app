import React, { useState, useEffect } from "react";
import { getTattoos } from "../../services/tattooService";
import TattooCard from "../../components/TattooCard";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("");
  const [allTattoos, setAllTattoos] = useState([]);
  const [filteredTattoos, setFilteredTattoos] = useState([]);

  useEffect(() => {
    const fetchTattoos = async () => {
      try {
        const data = await getTattoos();
        setAllTattoos(data);
        setFilteredTattoos(data); // inicializa con todos
      } catch (error) {
        console.error("Error fetching tattoos:", error);
      }
    };
    fetchTattoos();
  }, []);

  // Filtrado dinámico cada vez que query o style cambian
  useEffect(() => {
    const filtered = allTattoos.filter((tattoo) => {
      const matchesQuery = tattoo.name.toLowerCase().includes(query.toLowerCase());

      let tattooStyle = "";
      if (tattoo.description.includes("tribal")) tattooStyle = "tribal";
      else if (tattoo.description.includes("Flor") || tattoo.description.includes("floral")) tattooStyle = "floral";
      else if (tattoo.description.includes("geométrico")) tattooStyle = "geométrico";

      const matchesStyle = style ? tattooStyle === style : true;

      return matchesQuery && matchesStyle;
    });

    setFilteredTattoos(filtered);
  }, [query, style, allTattoos]);

  return (
    <div className="search-container">
      <h1>Search</h1>

      <div className="search-filters">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tatuajes..."
        />

        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="">Todos los estilos</option>
          <option value="tribal">Tribal</option>
          <option value="floral">Floral</option>
          <option value="geométrico">Geométrico</option>
        </select>
      </div>

      <div className="search-results">
        {filteredTattoos.length === 0 ? (
          <p>No results</p>
        ) : (
          filteredTattoos.map((tattoo) => <TattooCard key={tattoo.id_tattoo} tattoo={tattoo} />)
        )}
      </div>
    </div>
  );
};

export default Search;
