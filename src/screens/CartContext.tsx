import React, { createContext, useState, useContext } from "react";
//tipo do item do carrinho
export type CartItem = {
  id: string;
  name: string;
  preco: number;
  image: NodeRequire;  
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItems: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Função para adicionar ao carrinho
  const addToCart = (item: CartItem) => {
    if (!item.preco || isNaN(item.preco)) {
      console.error("Preço inválido ao adicionar ao carrinho:", item);
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  };
  

  // Função para remover do carrinho
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]); // Limpa todos os itens do carrinho
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Função para calcular o total de itens no carrinho
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acessar o carrinho
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
