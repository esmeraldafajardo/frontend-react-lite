// src/pages/Empresas.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/empresas.css";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [nueva, setNueva] = useState({
    nit: "",
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/empresas/`, {
        withCredentials: true,
      })
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al obtener empresas:", err));
  }, []);

  const handleChange = (e) => {
    setNueva({ ...nueva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/empresas/`, nueva, {
        withCredentials: true,
      })
      .then((res) => {
        setEmpresas([...empresas, res.data]);
        setNueva({ nit: "", nombre: "", direccion: "", telefono: "" });
      })
      .catch((err) => console.error("Error al crear empresa:", err));
  };

  const handleDelete = (id) => {
    console.log(id, "-*---id");
    if (window.confirm("¿Estás seguro de eliminar esta empresa?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/empresas/${id}/`, {
          withCredentials: true,
        })
        .then(() => {
          setEmpresas(empresas.filter((e) => e.nit !== id));
        })
        .catch((err) => console.error("Error al eliminar empresa:", err));
    }
  };

  return (
    <div className="empresas-container">
      <h2>Lista de Empresas</h2>

      {rol === "admin" && (
        <form className="empresa-form" onSubmit={handleSubmit}>
          <input
            name="nit"
            value={nueva.nit}
            onChange={handleChange}
            placeholder="NIT"
            required
          />
          <input
            name="nombre"
            value={nueva.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            name="direccion"
            value={nueva.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />
          <input
            name="telefono"
            value={nueva.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
          <button type="submit">Crear Empresa</button>
        </form>
      )}

      <div className="empresas-list">
        {empresas.map((empresa, index) => (
          <div className="empresa-card" key={index}>
            <h3>{empresa.nombre}</h3>
            <p>
              <strong>NIT:</strong> {empresa.nit}
            </p>
            <p>
              <strong>Dirección:</strong> {empresa.direccion}
            </p>
            <p>
              <strong>Teléfono:</strong> {empresa.telefono}
            </p>
            {rol === "admin" && (
              <button
                onClick={() => handleDelete(empresa.nit)}
                className="delete-btn"
              >
                🗑 Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empresas;
