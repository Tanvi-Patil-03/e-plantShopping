import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, increaseItem, decreaseItem, removeItem } from './CartSlice';
import './App.css';

const plants = [
  {id:1,name:'Lavender',category:'Aromatic Plants',price:299,image:'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500',description:'Beautiful fragrant lavender for relaxation.'},
  {id:2,name:'Rosemary',category:'Aromatic Plants',price:249,image:'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500',description:'Aromatic herb perfect for your kitchen.'},
  {id:3,name:'Mint',category:'Aromatic Plants',price:149,image:'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=500',description:'Fresh mint leaves with a refreshing aroma.'},
  {id:4,name:'Aloe Vera',category:'Medicinal Plants',price:199,image:'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500',description:'A natural plant known for its soothing properties.'},
  {id:5,name:'Tulsi',category:'Medicinal Plants',price:179,image:'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=500',description:'A traditional medicinal plant for your home.'},
  {id:6,name:'Neem',category:'Medicinal Plants',price:349,image:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500',description:'A versatile medicinal tree with many benefits.'}
];

function App() {
  const [page,setPage] = useState('home');
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const count = cart.reduce((sum,item)=>sum+item.quantity,0);
  const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);

  return (
    <div>
      <nav className="navbar">
        <h2 onClick={()=>setPage('home')}>🌿 Paradise Nursery</h2>
        <div>
          <button onClick={()=>setPage('home')}>Home</button>
          <button onClick={()=>setPage('products')}>Plants</button>
          <button onClick={()=>setPage('about')}>About Us</button>
          <button onClick={()=>setPage('cart')}>🛒 Cart ({count})</button>
        </div>
      </nav>

      {page==='home' && <section className="hero">
        <h1>Bring Nature Into Your Home</h1>
        <p>Discover beautiful plants and make your space greener.</p>
        <button className="primary" onClick={()=>setPage('products')}>Get Started</button>
      </section>}

      {page==='products' && <main className="container">
        <h1>Our Beautiful Plants</h1>
        {['Aromatic Plants','Medicinal Plants'].map(category=>(
          <section key={category}>
            <h2 className="section-title">{category}</h2>
            <div className="grid">
              {plants.filter(p=>p.category===category).map(plant=>(
                <article className="card" key={plant.id}>
                  <img src={plant.image} alt={plant.name}/>
                  <div className="card-body">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <h3>₹{plant.price}</h3>
                    <button className="primary" disabled={cart.some(i=>i.id===plant.id)} onClick={()=>dispatch(addItem(plant))}>
                      {cart.some(i=>i.id===plant.id)?'Added to Cart':'Add to Cart'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>}

      {page==='cart' && <main className="container">
        <h1>Your Shopping Cart 🛒</h1>
        {cart.length===0?<p>Your cart is empty. Start shopping!</p>:<>
          {cart.map(item=><article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name}/>
            <div><h3>{item.name}</h3><p>Unit Price: ₹{item.price}</p>
            <p>Subtotal: ₹{item.price*item.quantity}</p>
            <button onClick={()=>dispatch(decreaseItem(item.id))}>−</button>
            <strong> {item.quantity} </strong>
            <button onClick={()=>dispatch(increaseItem(item.id))}>+</button>
            <button className="delete" onClick={()=>dispatch(removeItem(item.id))}>Delete</button>
            </div>
          </article>)}
          <h2>Total: ₹{total}</h2>
          <button className="primary" onClick={()=>setPage('products')}>Continue Shopping</button>
          <button className="primary" onClick={()=>alert('Thank you for shopping at Paradise Nursery!')}>Checkout</button>
        </>}
      </main>}

      {page==='about' && <main className="container about">
        <h1>About Paradise Nursery</h1>
        <p>Welcome to Paradise Nursery, your destination for beautiful indoor plants.</p>
        <p>We believe plants bring happiness, freshness and positivity into every home.</p>
        <h2>Our Mission</h2>
        <p>To make every home greener by providing quality plants and an enjoyable shopping experience.</p>
      </main>}

      <footer>© 2026 Paradise Nursery | Grow Green, Live Green 🌱</footer>
    </div>
  );
}

export default App;
