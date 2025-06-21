// pages/Fresh.js
import React, { useEffect, useState } from 'react';

export const Fresh = () => {
  const [freshItems, setFreshItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/fresh-products") // Your API for fresh items
      .then(res => res.json())
      .then(data => setFreshItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <h2>Fresh Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {freshItems.map((item, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={item.image} alt={item.name} width="100%" />
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
