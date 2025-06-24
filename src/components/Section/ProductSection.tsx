'use client';

import { useState, useEffect } from 'react';
import ProductList from '@/app/product/ProductList';
import { motion } from 'framer-motion';

type Props = {
  selectedCategory: string | null;
};

export default function ProductSection({ selectedCategory }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return (
      <section className="flex-1 flex flex-col gap-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white p-4 rounded-2xl shadow-sm h-16"
        >
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white p-4 rounded-2xl shadow-sm flex-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-[#F3F3F3] border border-[#E0E0E0] rounded-2xl p-4 h-[380px] animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col gap-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-4 rounded-2xl shadow-sm"
      >
        <div className="flex items-center justify-between">
          <motion.h2 variants={itemVariants} className="text-lg font-semibold text-gray-900">
            {selectedCategory || 'Бүгд'}
          </motion.h2>
          <motion.select
            variants={itemVariants}
            className="border border-gray-300 rounded-lg px-4 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-"
          >
            <option>Шинэ нь эхэндээ</option>
            <option>Үнэ өсөхөөр</option>
            <option>Үнэ буурахаар</option>
          </motion.select>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-4 rounded-2xl shadow-sm flex-1"
      >
        <ProductList selectedCategory={selectedCategory} />
      </motion.div>
    </section>
  );
}
