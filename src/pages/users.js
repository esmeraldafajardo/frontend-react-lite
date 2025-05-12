// src/pages/CrearUsuario.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/usuarios.css";

const CrearUsuario = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    rol: "externo",
  });
  const [mensaje, setMensaje] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/crear/`, form, {
        withCredentials: true,
      })
      .then((res) => {
        setMensaje(res.data.message);
        setForm({ username: "", password: "", rol: "externo" });
        obtenerUsuarios();
      })
      .catch((err) =>
        setMensaje(err.response?.data?.error || "Error inesperado")
      );
  };

  const obtenerUsuarios = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/usuarios/`, {
        withCredentials: true,
      })
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al obtener usuarios:", err));
  };

  const eliminarUsuario = (username) => {
    if (window.confirm(`¿Estás segura de eliminar a ${username}?`)) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/usuarios/${username}/`, {
          withCredentials: true,
        })
        .then(() => obtenerUsuarios())
        .catch((err) => console.error("Error al eliminar usuario:", err));
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);
  const usuarioActual = localStorage.getItem("username");

  return (
    <div className="usuarios-container">
      <h2>Crear Nuevo Usuario</h2>
      <form className="usuario-form" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="externo">Externo</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>
      {mensaje && <p className="mensaje-info">{mensaje}</p>}

      <h3 style={{ textAlign: "center" }}>Usuarios Registrados</h3>
      <ul className="lista-usuarios">
        {usuarios.map((u, i) => (
          <li key={i}>
            {u.username} ({u.rol})
            {u.username !== usuarioActual && (
              <button onClick={() => eliminarUsuario(u.username)}>
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrearUsuario;
