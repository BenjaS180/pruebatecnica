import React, { useState } from 'react';

const ProductList = () => {
  const [products] = useState([
    {
      Ean: '123456789',
      product_name: 'A',
      query_data: ['data1', 'data2'],
      different_markets: 3,
      price_range: 20,
    },
    {
      Ean: '987654321',
      product_name: 'B',
      query_data: ['data3', 'data4'],
      different_markets: 2,
      price_range: 15,
    },
    {
      Ean: '543210987',
      product_name: 'C',
      query_data: ['data5', 'data6'],
      different_markets: 4,
      price_range: 25,
    },
  ]);

  const [filterName, setFilterName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([...products]);

  const updateFilter = (filter) => {
    if (filter === '') {
      setFilteredProducts([...products]);
    } else {
      const elementsToRemove = products.filter(
        (product) => !product.product_name.toLowerCase().includes(filter.toLowerCase())
      );

      elementsToRemove.forEach((element, index) => {
        setTimeout(() => {
          setFilteredProducts((prevProducts) =>
            prevProducts.filter((product) => product !== element)
          );
        }, index * 1000);
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filterName}
        onChange={(e) => {
          const newFilter = e.target.value;
          setFilterName(newFilter);
          updateFilter(newFilter);
        }}
      />
      {filteredProducts.map((product) => (
        <div key={product.Ean}>
          <h3>{product.product_name}</h3>
          <p>Price Range: {product.price_range}</p>
          <p>Different Markets: {product.different_markets}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Product List</h1>
      <ProductList />
    </div>
  );
};

export default App;
