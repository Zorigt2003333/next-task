'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type Props = {
  selectedCategory: string | null;
};

export default function ProductList({ selectedCategory }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, decreaseCart, cartItems } = useCart();

  useEffect(() => {
    const fetchWithDelay = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    };

    fetchWithDelay();
  }, []);

  const increase = (product: Product) => {
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: undefined,
    });
  };

  const decrease = (id: number) => {
    setQuantities((prev) => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
    decreaseCart(id);
  };

  const skeletons = new Array(8).fill(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {isLoading ? (
        skeletons.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#F3F3F3] border border-[#E0E0E0] rounded-xl p-4 w-full h-[360px] animate-pulse flex flex-col justify-between"
          >
            <div className="w-full h-40 bg-white rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-10 bg-white border border-gray-300 rounded-xl mt-4"></div>
          </motion.div>
        ))
      ) : (
        <AnimatePresence>
          {filteredProducts.map((product) => {
            const quantity =
              cartItems.find((i: { id: number }) => i.id === product.id)?.quantity || 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F3F3F3] border border-[#E0E0E0] rounded-3xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between h-[380px]"
              >
                <Link href={`/product/${product.id}`}>
                  <motion.div
                    className="cursor-pointer flex flex-col gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="relative w-full h-45 rounded-2xl overflow-hidden bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain w-full h-full transition-all duration-200"
                      />
                      {quantity > 0 && (
                        <div className="absolute inset-0 bg-gray-800 opacity-40 z-10"></div>
                      )}
                      {quantity > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold drop-shadow"
                        >
                          {quantity}
                        </motion.span>
                      )}
                    </motion.div>

                    <div className="flex flex-col justify-between gap-1 min-h-[100px]">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-bold text-gray-800"
                      >
                        {product.price.toLocaleString()}₮
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm font-medium text-gray-900 line-clamp-2"
                      >
                        {product.title}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xs text-gray-500"
                      >
                        500мл x 12ш
                      </motion.p>
                    </div>
                  </motion.div>
                </Link>
                {quantity === 0 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => increase(product)}
                    className="mt-4 w-full bg-white border border-gray-300 rounded-xl py-2 font-semibold hover:bg-gray-100 transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0 }}
                  >
                    Сагслах
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 flex items-center justify-between"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => decrease(product.id)}
                      className="w-10 h-10 rounded-xl bg-white border border-gray-300 text-2xl font-bold flex items-center justify-center"
                    >
                      –
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => increase(product)}
                      className="w-10 h-10 rounded-xl bg-green-500 text-white text-2xl font-bold flex items-center justify-center"
                    >
                      +
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}
