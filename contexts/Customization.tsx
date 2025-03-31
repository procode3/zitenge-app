'use client'
import { createContext, useContext, useState, useEffect } from 'react';

export const CustomizationContext = createContext({});

export const colors = [
  {
    color: '#f5f5f5',
    name: 'Rustic',
  },
  {
    color: '#222222',
    name: 'Black',
  },
  {
    color: '#FFF5EE',
    name: 'White',
  },
  {
    color: '#ff0000',
    name: 'Red',
  },
  {
    color: '#b22222',
    name: 'Maroon',
  },
  {
    color: '#0000ff',
    name: 'Blue',
  },
];

export const CustomizationProvider = (props) => {
  const [design, setDesign] = useState('spaced');
  const [shelfColor, setShelfColor] = useState(colors[0]);
  const [frameColor, setFrameColor] = useState(colors[0]);
  const [selectedRack, setSelectedRack] = useState({
    name: '70 Pair',
    length: 150,
    levels: 10,
    price: {
      rustic: 15000,
      painted: 17000,
      combined: 16000,
    },
  });
  const [cart, setCart] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLoadingCart(false);
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    console.log(item);
    setCart((prevCart) => prevCart.filter((i) => i !== item));
    localStorage.setItem(
      'cart',
      JSON.stringify(cart.filter((i) => i !== item))
    );
    const screenshots = JSON.parse(localStorage.getItem('screenshots'));
    delete screenshots[item.id];
    localStorage.setItem('screenshots', JSON.stringify(screenshots));
  };

  // Clear all items in the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CustomizationContext.Provider
      value={{
        design,
        setDesign,
        shelfColor,
        setShelfColor,
        frameColor,
        setFrameColor,
        selectedRack,
        setSelectedRack,
        cart,
        addToCart,
        clearCart,
        removeFromCart,
        isLoadingCart
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
