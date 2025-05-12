import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/empresas/')
      .then(res => setEmpresas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lista de Empresas</h2>
      <ul>
        {empresas.map((empresa, index) => (
          <li key={index}>
            <strong>{empresa.nombre}</strong> – NIT: {empresa.nit}<br />
            Dirección: {empresa.direccion}<br />
            Teléfono: {empresa.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Empresas;
