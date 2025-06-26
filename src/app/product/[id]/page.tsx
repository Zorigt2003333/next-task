'use client';

import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { use, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommended] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productRes, recRes] = await Promise.all([
          fetch(`https://fakestoreapi.com/products/${id}`),
          fetch('https://fakestoreapi.com/products?limit=4'),
        ]);
        if (!productRes.ok) return notFound();
        const productData = await productRes.json();
        const recData = await recRes.json();
        setProduct(productData);
        setRecommended(recData);
      } catch (error) {
        console.error('Ugugdul tatahad error:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="w-full max-w-7xl px-6 py-8 pt-20">
          <div className="text-sm text-gray-300 mb-6 h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 flex gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="bg-white p-2 rounded-xl flex-1 flex items-center justify-center min-h-[320px]">
                <div className="w-full h-[300px] bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="md:col-span-4 bg-white p-6 rounded-xl">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="md:col-span-4 bg-white p-6 rounded-xl">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="mt-12">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#F3F3F3] border border-[#E0E0E0] rounded-2xl p-4 h-[360px]"
                  >
                    <div className="w-full h-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded mt-4 animate-pulse"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return notFound();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Header />
      <motion.div
        className="w-full px-6 py-8 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-sm text-gray-600 mb-6">
          <span className="text-gray-700">TechPack</span> •{' '}
          <span className="font-semibold text-black">{product.title}</span>
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
        >
          <motion.div variants={itemVariants} className="md:col-span-4 flex gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm overflow-hidden">
                <img src={product.image} alt="Thumbnail" className="object-contain w-full h-full" />
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-2 rounded-xl shadow-sm flex-1 flex items-center justify-center min-h-[320px]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[300px] object-contain"
              />
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-white p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-bold mb-1">{product.title}</h2>
            <p className="text-sm text-gray-500 mb-2">1л x 6ш</p>
            <h3 className="text-sm font-semibold mb-1">Дэлгэрэнгүй мэдээлэл</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-white p-6 rounded-xl flex flex-col justify-between shadow-sm"
          >
            <p className="text-2xl font-bold mb-6">{product.price.toLocaleString()}₮</p>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // onClick={() =>
                //   addToCart({
                //     id: product.id,
                //     title: product.title,
                //     price: product.price,
                //     image: product.image,
                //     description: undefined,
                //   })
                // }
                className="w-full bg-[#0AAD0A] hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition"
              >
                Сагслах
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border border-gray-300 hover:bg-gray-100 py-2 font-semibold rounded-xl transition "
              >
                Шууд авах
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-12 w-full">
          <div className="max-w-7xl w-full bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Санал болгох</h3>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {recommendedProducts.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#F3F3F3] border border-[#E0E0E0] rounded-3xl p-4 shadow-sm hover:shadow-md flex flex-col justify-between h-[360px]"
                  >
                    <Link href={`/product/${item.id}`}>
                      <motion.div
                        className="cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative w-full h-40 mb-2 rounded-2xl overflow-hidden bg-white">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-contain h-full w-full"
                          />
                        </div>
                        <div className="min-h-[100px] flex flex-col justify-between">
                          <p className="text-lg font-bold mb-1">{item.price.toLocaleString()}₮</p>
                          <p className="text-sm font-medium leading-tight line-clamp-2 text-gray-800">
                            {item.title}
                          </p>
                          <p></p>
                          <p className="text-xs text-gray-500 mt-1">500мл x 12ш</p>
                        </div>
                      </motion.div>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full bg-white border border-gray-300 rounded-xl py-2 font-semibold hover:bg-gray-100 text-sm transition"
                    >
                      Сагслах
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
