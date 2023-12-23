import React, { useState, useEffect } from 'react';

const ListaProductos = () => {
  const [productos, setProductos] = useState([
    {
      Ean: '123456789',
      nombre_producto: 'Producto A',
      datos_query: ['dato1', 'dato2'],
      cantidad_markets: 3,
      rango_precios: 20,
    },
    {
      Ean: '987654321',
      nombre_producto: 'Producto B',
      datos_query: ['dato3', 'dato4'],
      cantidad_markets: 2,
      rango_precios: 15,
    },
    {
      Ean: '543210987',
      nombre_producto: 'Producto C',
      datos_query: ['dato5', 'dato6'],
      cantidad_markets: 4,
      rango_precios: 25,
    },
  ]);

  const [filtroNombre, setFiltroNombre] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [fadeOutCounter, setFadeOutCounter] = useState(0);

  useEffect(() => {
    setProductosFiltrados(
      productos.filter((producto) =>
        producto.nombre_producto.toLowerCase().includes(filtroNombre.toLowerCase())
      )
    );
    setFadeOutCounter(0);
  }, [filtroNombre, productos]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (productosFiltrados.length > 0 && productosFiltrados.length < productos.length) {
        setFadeOutCounter((prevCounter) => prevCounter + 1);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [productosFiltrados, productos]);

  useEffect(() => {
    if (fadeOutCounter > 0) {
      setProductosFiltrados((prevProductos) => prevProductos.slice(productosFiltrados, -1));
      setFadeOutCounter(0);
    }
  }, [fadeOutCounter]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
      />
      {productosFiltrados.map((producto, index) => (
        <div key={producto.Ean} style={{ opacity: index >= productosFiltrados.length ? 0 : 1 }}>
          <h3>{producto.nombre_producto}</h3>
          <p>Rango de Precios: {producto.rango_precios}</p>
          <p>Mercados Diferentes: {producto.cantidad_markets}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Lista de Productos</h1>
      <ListaProductos />
    </div>
  );
};

export default App;
