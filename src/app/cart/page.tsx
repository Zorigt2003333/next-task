'use client';

import { useCart } from '@/context/CartContext';
import Header from '@/components/Header/Header';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, increaseCart, decreaseCart, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <Header />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12 min-h-screen bg-gray-50">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-gray-800 mb-4"
        >
          Сагс <span className="text-sm text-gray-500">({itemCount} бараа)</span>
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center py-20 text-lg"
          >
            Сагсанд бүтээгдэхүүн алга байна.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex justify-between items-center bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-gray-50 rounded-lg border border-gray-200"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end min-h-[100px] min-w-[160px]">
                      <p className="text-sm font-bold text-gray-900">
                        {(item.price * item.quantity).toLocaleString()}₮
                      </p>

                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => decreaseCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>

                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-green-500 text-white hover:bg-green-600 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 h-fit lg:sticky lg:top-24 space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl text-sm sm:text-base transition"
              >
                Захиалах
              </motion.button>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Захиалгын дүн ({itemCount} бүтээгдэхүүн)</span>
                <span>{total.toLocaleString()}₮</span>
              </div>
              <hr className="border-t border-gray-200" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Төлөх дүн</span>
                <span>{total.toLocaleString()}₮</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
