// src/pages/IADescripcion.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/ia.css";

const IADescripcion = () => {
  const [nombre, setNombre] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/generar-descripcion/`, {
        nombre,
        caracteristicas,
      })
      .then((res) => {
        setDescripcion(res.data.descripcion_generada);
        setError(null);
      })
      .catch((err) => {
        setDescripcion("");
        setError("Error al generar la descripción.");
      });
  };

  return (
    <div className="ia-container">
      <h2>Generar Descripción con IA</h2>
      <form className="ia-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Características del producto"
          value={caracteristicas}
          onChange={(e) => setCaracteristicas(e.target.value)}
          required
        ></textarea>
        <button type="submit">Generar descripción</button>
      </form>

      {descripcion && (
        <div className="ia-output">
          <h3>Descripción Generada:</h3>
          <p>{descripcion}</p>
        </div>
      )}

      {error && <p className="ia-error">{error}</p>}
    </div>
  );
};

export default IADescripcion;
