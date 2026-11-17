import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();

    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { id: 1, name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { id: 2, name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { id: 3, name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
                { id: 4, name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
                { id: 5, name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
                { id: 6, name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { id: 7, name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=500", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { id: 8, name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=500", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
                { id: 9, name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
                { id: 10, name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
                { id: 11, name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, promotes relaxation.", cost: "$14" },
                { id: 12, name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Beautiful flowering plant known for its fragrance.", cost: "$22" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        const price = Number(plant.cost.replace('$', ''));

        dispatch(addItem({
            ...plant,
            price
        }));

        setAddedToCart(prevState => ({
            ...prevState,
            [plant.name]: true
        }));
    };

    return (
        <div className="product-grid">
            {plantsArray.map((category, index) => (
                <div key={index}>
                    <h2>{category.category}</h2>

                    <div className="product-grid">
                        {category.plants.map((plant) => (
                            <div className="product-card" key={plant.id}>
                                <img
                                    src={plant.image}
                                    alt={plant.name}
                                />

                                <h3>{plant.name}</h3>

                                <p>{plant.description}</p>

                                <h4>{plant.cost}</h4>

                                <button
                                    onClick={() => handleAddToCart(plant)}
                                    disabled={addedToCart[plant.name]}
                                >
                                    {addedToCart[plant.name]
                                        ? "Added to Cart"
                                        : "Add to Cart"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {

    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount of all products
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.cost.substring(1));
            return total + price * item.quantity;
        }, 0).toFixed(2);
    };

    // Continue shopping
    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    // Checkout
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    // Increment quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            amount: item.quantity + 1
        }));
    };

    // Decrement quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                amount: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Remove item
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate subtotal for individual product
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    return (
        <div className="cart-container">

            <h2 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            <div>
                {cart.map(item => (

                    <div className="cart-item" key={item.name}>

                        <img
                            className="cart-item-image"
                           
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector(state => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>

        <button onClick={() => setShowCart(false)}>
          Plants
        </button>

        <button onClick={() => setShowCart(true)}>
          🛒 Cart ({totalItems})
        </button>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
