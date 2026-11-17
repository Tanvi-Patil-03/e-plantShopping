cat > src/ProductList.jsx <<'EOF'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plants = [
  {id:1,name:'Snake Plant',category:'Air Purifying Plants',price:299,image:'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500',description:'Improves indoor air quality.'},
  {id:2,name:'Spider Plant',category:'Air Purifying Plants',price:249,image:'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500',description:'Beautiful and easy to maintain.'},
  {id:3,name:'Peace Lily',category:'Air Purifying Plants',price:399,image:'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500',description:'Elegant flowering indoor plant.'},
  {id:4,name:'Lavender',category:'Aromatic Plants',price:299,image:'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500',description:'Calming fragrance for your home.'},
  {id:5,name:'Rosemary',category:'Aromatic Plants',price:249,image:'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500',description:'Fresh aromatic kitchen herb.'},
  {id:6,name:'Mint',category:'Aromatic Plants',price:149,image:'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=500',description:'Refreshing and fragrant herb.'},
  {id:7,name:'Aloe Vera',category:'Medicinal Plants',price:199,image:'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500',description:'Popular medicinal succulent.'},
  {id:8,name:'Tulsi',category:'Medicinal Plants',price:179,image:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500',description:'Traditional medicinal plant.'}
];

function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  return (
    <main className="container">
      <h1>Explore Our Plants 🌿</h1>
      {['Air Purifying Plants','Aromatic Plants','Medicinal Plants'].map(category => (
        <section key={category}>
          <h2 className="section-title">{category}</h2>
          <div className="grid">
            {plants.filter(p => p.category === category).map(plant => (
              <article className="card" key={plant.id}>
                <img src={plant.image} alt={plant.name}/>
                <div className="card-body">
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <h3>₹{plant.price}</h3>
                  <button
                    className="primary"
                    disabled={cart.some(i => i.id === plant.id)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {cart.some(i => i.id === plant.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
EOF