// src/pages/Productos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/productos.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const [nuevo, setNuevo] = useState({
    nombre: "",
    codigo: "",
    caracteristicas: "",
    precio_gtq: "",
    precio_usd: "",
    empresa: "",
  });
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/productos/`, {
        withCredentials: true,
      })
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/productos/`, nuevo, {
        withCredentials: true,
      })
      .then((res) => {
        setProductos([...productos, res.data]);
        setNuevo({
          nombre: "",
          codigo: "",
          caracteristicas: "",
          precio_gtq: "",
          precio_usd: "",
          empresa: "",
        });
      })
      .catch((err) => console.error("Error al crear producto:", err));
  };

  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/empresas/`, {
        withCredentials: true,
      })
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al obtener empresas:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás segura de eliminar este producto?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/productos/${id}/`, {
          withCredentials: true,
        })
        .then(() => {
          setProductos((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((err) => console.error("Error al eliminar producto:", err));
    }
  };

  return (
    <div className="productos-container">
      {rol === "admin" && (
        <form className="producto-form" onSubmit={handleSubmit}>
          <input
            name="nombre"
            value={nuevo.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            name="codigo"
            value={nuevo.codigo}
            onChange={handleChange}
            placeholder="Código"
            required
          />
          <input
            name="caracteristicas"
            value={nuevo.caracteristicas}
            onChange={handleChange}
            placeholder="Características"
            required
          />
          <input
            name="precio_gtq"
            value={nuevo.precio_gtq}
            onChange={handleChange}
            placeholder="Precio GTQ"
            required
          />
          <input
            name="precio_usd"
            value={nuevo.precio_usd}
            onChange={handleChange}
            placeholder="Precio USD"
            required
          />
          {/* <input
            name="empresa"
            value={nuevo.empresa}
            onChange={handleChange}
            placeholder="ID Empresa"
            required
          /> */}
          <select
            name="empresa"
            value={nuevo.empresa}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map((e) => (
              <option key={e.nit} value={e.nit}>
                {e.nombre}
              </option>
            ))}
          </select>

          <button type="submit">Crear Producto</button>
        </form>
      )}

      <h2>Lista de Productos</h2>
      <div className="productos-list">
        {productos.map((producto, index) => (
          <div className="producto-card" key={index}>
            <h3>{producto.nombre}</h3>
            <p>
              <strong>Código:</strong> {producto.codigo}
            </p>
            <p>
              <strong>Características:</strong> {producto.caracteristicas}
            </p>
            <p>
              <strong>Precio GTQ:</strong> Q{producto.precio_gtq}
            </p>
            <p>
              <strong>Precio USD:</strong> ${producto.precio_usd}
            </p>
            {rol === "admin" && (
              <button
                onClick={() => handleDelete(producto.id)}
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

export default Productos;
