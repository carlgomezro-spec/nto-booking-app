import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Importar UUID
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TattooCard from "../../components/TattooCard";
import { getTattoos } from "../../services/tattooService";
import "../Home/Home.css";


const Home = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTattoos = async () => {
      try {
        const data = await getTattoos();

        // Añadir uuid a cada tattoo si no tiene id
        const dataWithUUID = data.map((tattoo) => ({
          ...tattoo,
          uuid: uuidv4(),
        }));

        setTattoos(dataWithUUID);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTattoos();
  }, []);

  if (loading) return <p>Loading tattoos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h1>Discover</h1>
        <h3>WHAT'S NEW TODAY</h3>
      <div className="tattoo-carousel">
      <Swiper
        spaceBetween={20}
        slidesPerView={1} // 1 por defecto
        breakpoints={{
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
        }}
      >
        {tattoos.map((tattoo) => (
          <SwiperSlide key={tattoo.id}>
            <TattooCard tattoo={tattoo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </section>
    
  );
};

export default Home;
