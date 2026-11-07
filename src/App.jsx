import { useEffect, useState } from 'react';

function ProductCard({ title, description, price, thumbnail, category }) {
  return (
    <div className="post">
      <img src={thumbnail} alt={title} />
      <span className="tag">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <b className="price">${price}</b>
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Fetch data once when the page loads
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => setItems(data.products))
      .catch(err => setError('Could not load products. ' + err.message))
      .finally(() => setLoading(false));
  }, []);

  const shown = items.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Product Explorer</h1>
        <input
          placeholder="Search by title"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      {loading && <p className="info">Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && shown.length === 0 && (
        <p className="info">No products found.</p>
      )}

      <main className="grid">
        {shown.map(p => <ProductCard key={p.id} {...p} />)}
      </main>
    </div>
  );
}