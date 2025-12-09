import React from "react";
import "../TattooCare/TattooCare.css";

const TattooCare = () => {
  
  return (
    <section className="tattoo-care">
      <h1>Take care</h1>
      <p>Para cuidar un tatuaje nuevo, lávalo suavemente dos veces al día con agua tibia y jabón neutro, sécalo con papel absorbente dando toquecitos y aplica una fina capa de crema específica para tatuajes</p>
      <article className="tattoo-care-article"> 
        <h3>DAILY CARE</h3>
      <ul>
        <li><strong>Limpieza:</strong> Lava el tatuaje suavemente con agua tibia y jabón neutro, un mínimo de dos o tres veces al día. Usa solo las manos limpias para lavar la zona, evita esponjas o toallas ásperas.
        </li>
        <li><strong>Secado:</strong> Seca la zona con papel de cocina absorbente dando toquecitos suaves. No frotes. Deja que se seque al aire por completo.
        </li>
        <li><strong>Hidratación:</strong>  Aplica una capa muy fina de la crema hidratante recomendada por tu tatuador, extendiéndola bien. No apliques una capa gruesa que pueda obstruir los poros. Evita cremas con fragancias o alcohol. 
        </li>
      </ul>
      </article>
      
      <h3>WHAT YOU SHOULD AVOID</h3>
      <ul>
        <li><strong>Sol:</strong>  No expongas el tatuaje al sol hasta que esté completamente curado. Una vez curado, usa protector solar de alto factor (FPS 50+).
        </li>
        <li><strong>Rascarse:</strong>  No te rasques ni arranques las costras que se formen. Deja que se caigan solas para evitar dañar el tatuaje y perder color. 
        </li>
        <li><strong>Ropa:</strong>  Usa ropa holgada que no roce ni se pegue al tatuaje. Esto facilita la cicatrización.
        </li>
      </ul>
    </section>
  );
};

export default TattooCare;
