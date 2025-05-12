// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Empresas from "./pages/Empresas";
import Users from "./pages/users";
import Productos from "./pages/Productos";
import Inventario from "./pages/Inventario";
import IADescripcion from "./pages/IADescripcion";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("rol");

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/users" element={<Users />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/ia-descripcion" element={<IADescripcion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
