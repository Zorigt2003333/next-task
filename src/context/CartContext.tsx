'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: ReactNode;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  uniqueCartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  increaseCart: (id: number) => void;
  decreaseCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  getItemQuantity: (id: number) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseCart = (id: number) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  };

  const decreaseCart = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueCartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        uniqueCartCount,
        addToCart,
        increaseCart,
        decreaseCart,
        removeFromCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('...');
  return context;
}
