// src/pages/Inventario.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/inventario.css";

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({
    empresa: "",
    producto: "",
    cantidad: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/inventario/`, { withCredentials: true })
      .then((res) => setInventario(res.data))
      .catch((err) => console.error("Error al obtener inventario:", err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/empresas/`, { withCredentials: true })
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al obtener empresas:", err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/productos/`, { withCredentials: true })
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/inventario/`, nuevo, {
        withCredentials: true,
      })
      .then((res) => {
        setInventario([...inventario, res.data]);
        setNuevo({ empresa: "", producto: "", cantidad: "" });
      })
      .catch((err) => console.error("Error al crear inventario:", err));
  };

  const handleDescargarPDF = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/inventario/pdf/`, "_blank");
  };

  const handleEnviarCorreo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/inventario/enviar/`, {
        withCredentials: true,
      })
      .then(() =>
        setMensaje("Correo enviado correctamente (simulado en consola).")
      )
      .catch(() => setMensaje("Error al enviar el correo."));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta inventario?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/inventario/${id}/`, {
          withCredentials: true,
        })
        .then(() => {
          setInventario(inventario.filter((e) => e.id !== id));
        })
        .catch((err) => console.error("Error al eliminar inventario:", err));
    }
  };

  return (
    <div className="inventario-container">
      <h2>Inventario por Empresa</h2>

      {rol === "admin" && (
        <form className="inventario-form" onSubmit={handleSubmit}>
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

          <select
            name="producto"
            value={nuevo.producto}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((p) => (
              // <option key={p.codigo} value={p.codigo}>
              //   {p.nombre}
              // </option>
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="cantidad"
            value={nuevo.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            required
          />

          <button type="submit">Agregar Inventario</button>
        </form>
      )}

      <div className="inventario-buttons">
        <button onClick={handleDescargarPDF}>📄 Descargar PDF</button>
        <button onClick={handleEnviarCorreo}>✉️ Enviar por correo</button>
      </div>

      {mensaje && <p className="mensaje-info">{mensaje}</p>}

      <div className="inventario-list">
        {inventario.map((item, index) => (
          <div className="inventario-card" key={index}>
            <h3>{item.empresa_nombre}</h3>
            <p>
              <strong>Producto:</strong> {item.producto_nombre}
            </p>
            <p>
              <strong>Cantidad:</strong> {item.cantidad}
            </p>
            {rol === "admin" && (
              <button
                onClick={() => handleDelete(item.id)}
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

export default Inventario;
