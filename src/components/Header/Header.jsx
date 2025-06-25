'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { uniqueCartCount } = useCart();

  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-white shadow-sm"
    >
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/freshpack.png"
            alt="FreshPack Logo"
            width={100}
            height={40}
            priority
          />
        </div>
      </Link>

      <Link href="/cart" className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-16 h-10 rounded-full border-gray-400 bg-gray-200 transition"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span className="text-base font-bold">{uniqueCartCount}</span>
        </motion.div>
      </Link>
    </motion.header>
  );
}
