'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { uniqueCartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
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
        <div className="flex items-center justify-center w-16 h-10 rounded-full bg-gray-200">
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span className="text-base font-bold">{uniqueCartCount}</span>
        </div>
      </Link>
    </header>
  );
}
