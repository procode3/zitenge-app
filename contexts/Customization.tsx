'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

export type Color = {
  id: string;
  name: string;
  hex: string;
};

export type RackPrice = {
  rustic: number;
  painted: number;
  combined: number;
};

export type Rack = {
  id: string;
  name: string;
  length: number;
  levels: number;
  price: RackPrice;
};

export type CartItem = {
  id: string;
  shelfColor: Color;
  frameColor: Color;
  design: string;
  rack: Rack;
  shoeRackId: string;
  quantity: number;
  price: number;
  name: string | undefined;
};

export type CustomizationContextType = {
  design: string;
  setDesign: (value: string) => void;
  shelfColor: Color | null;
  setShelfColor: (value: Color) => void;
  frameColor: Color | null;
  setFrameColor: (value: Color) => void;
  selectedRack: Rack;
  setSelectedRack: (rack: Rack) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  isLoadingCart: boolean;
};

export const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);



export const CustomizationProvider = ({ children }: { children: ReactNode }) => {
  const [design, setDesign] = useState<string>('spaced');
  const [shelfColor, setShelfColor] = useState<Color | null>(null);
  const [frameColor, setFrameColor] = useState<Color | null>(null);
  const [selectedRack, setSelectedRack] = useState<Rack>({
    id: '',
    name: '70 Pair',
    length: 150,
    levels: 10,
    price: {
      rustic: 15000,
      painted: 17000,
      combined: 16000,
    },
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(true);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    setIsLoadingCart(false);
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prevCart) => prevCart.filter((i) => i !== item));
    localStorage.setItem(
      'cart',
      JSON.stringify(cart.filter((i) => i !== item))
    );
    const screenshots = JSON.parse(localStorage.getItem('screenshots') || '{}');
    delete screenshots[item.id];
    localStorage.setItem('screenshots', JSON.stringify(screenshots));
  };

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
        isLoadingCart,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = (): CustomizationContextType => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
