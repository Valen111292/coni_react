import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [equipos, setEquipos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [nuevoEquipo, setNuevoEquipo] = useState({
    n_inventario: '',
    n_serie: '',
    clase: '',
    marca: '',
    ram: '',
    disco: '',
    procesador: '',
    estado: ''
  });
  const [editando, setEditando] = useState(false);
  const [equipoEditando, setEquipoEditando] = useState(null);
  

  useEffect(() => {
    const fetchEquipos = async () => {
      let url = 'http://localhost:8080/coni1.2/api/equipos';
      if (filtro) {
        url += `?estado=${encodeURIComponent(filtro)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setEquipos(data);
    };
    fetchEquipos();
  }, [filtro]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editando) {
      setEquipoEditando({ ...equipoEditando, [name]: value });
    } else {
      setNuevoEquipo({ ...nuevoEquipo, [name]: value });
    }
  };

  const handleAgregar = async () => {
    const res = await fetch('http://localhost:8080/coni1.2/api/equipos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEquipo),
    });
    if (res.ok) {
      alert('Equipo agregado exitosamente.');
      setNuevoEquipo({
        n_inventario: '',
        n_serie: '',
        clase: '',
        marca: '',
        ram: '',
        disco: '',
        procesador: '',
        estado: ''
      });
      setFiltro(''); // refresca lista
    }
  };

  const handleEliminar = async (n_inventario) => {
    const res = await fetch(`http://localhost:8080/coni1.2/api/equipos?n_inventario=${n_inventario}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Equipo eliminado exitosamente.');
      setFiltro(''); // refresca lista
    }
  };

  const iniciarEdicion = (equipo) => {
    setEditando(true);
    setEquipoEditando(equipo);
  };

  const handleActualizar = async () => {
    const res = await fetch('http://localhost:8080/coni1.2/api/equipos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipoEditando),
    });
    if (res.ok) {
      alert('Equipo actualizado exitosamente.');
      setEditando(false);
      setEquipoEditando(null);
      setFiltro(''); // refresca lista
    }
  };

  const cancelarEdicion = () => {
    setEditando(false);
    setEquipoEditando(null);
  };

  const handleCerrarSesion = () => {
    alert('Sesión cerrada'); 
  };

  return (
    <div>
      <div className="encabezado">
        <img src="/img/ESLOGAN CONI.png" className="imagen-encabezado" alt="Logo CONI" />
        <div className="barra-superior">
          <nav>
            <li><button onClick={handleCerrarSesion}>Cerrar sesión</button></li>
          </nav>
        </div>
      </div>

      <h1>Gestión de Equipos CONI</h1>

      <h2>{editando ? 'Editar Equipo' : 'Agregar Nuevo Equipo'}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editando ? handleActualizar() : handleAgregar();
        }}
      >
        <input
          name="n_inventario"
          placeholder="Número Inventario"
          value={editando ? equipoEditando.n_inventario : nuevoEquipo.n_inventario}
          onChange={handleInputChange}
          disabled={editando}
          required
        />
        <input
          name="n_serie"
          placeholder="Número Serie"
          value={editando ? equipoEditando.n_serie : nuevoEquipo.n_serie}
          onChange={handleInputChange}
          required
        />
        <input
          name="clase"
          placeholder="Clase"
          value={editando ? equipoEditando.clase : nuevoEquipo.clase}
          onChange={handleInputChange}
          required
        />
        <input
          name="marca"
          placeholder="Marca"
          value={editando ? equipoEditando.marca : nuevoEquipo.marca}
          onChange={handleInputChange}
          required
        />
        <input
          name="ram"
          placeholder="RAM"
          value={editando ? equipoEditando.ram : nuevoEquipo.ram}
          onChange={handleInputChange}
        />
        <input
          name="disco"
          placeholder="Disco"
          value={editando ? equipoEditando.disco : nuevoEquipo.disco}
          onChange={handleInputChange}
        />
        <input
          name="procesador"
          placeholder="Procesador"
          value={editando ? equipoEditando.procesador : nuevoEquipo.procesador}
          onChange={handleInputChange}
        />
        <input
          name="estado"
          placeholder="Estado"
          value={editando ? equipoEditando.estado : nuevoEquipo.estado}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
        {editando && <button type="button" onClick={cancelarEdicion}>Cancelar</button>}
      </form>

      <div>
        <label>Filtrar por estado:</label>
        <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="">Todos</option>
          <option value="disponible">DISPONIBLE</option>
          <option value="asignado">ASIGNADO</option>
          <option value="pendiente">PENDIENTE</option>
        </select>
      </div>

      <table border="1" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Inventario</th>
            <th>Número de Serie</th>
            <th>Clase</th>
            <th>Marca</th>
            <th>RAM</th>
            <th>Disco</th>
            <th>Procesador</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.n_inventario}>
              <td>{equipo.n_inventario}</td>
              <td>{equipo.n_serie}</td>
              <td>{equipo.clase}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.ram}</td>
              <td>{equipo.disco}</td>
              <td>{equipo.procesador}</td>
              <td>{equipo.estado}</td>
              <td>
                <button onClick={() => iniciarEdicion(equipo)}>Editar</button>
                <button onClick={() => handleEliminar(equipo.n_inventario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
