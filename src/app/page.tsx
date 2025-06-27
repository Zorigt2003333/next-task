'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';

import ProductSection from '@/components/Section/ProductSection';
import Sidebar from '@/components/Sidebar/Siderbar';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <Header />
      <main className="min-h-screen flex items-start justify-center px-6 pt-22 py-4">
        <div className="flex gap-6 w-full max-w-7xl">
          <Sidebar onSelectCategory={setSelectedCategory} />
          <ProductSection selectedCategory={selectedCategory} />
        </div>
      </main>
    </div>
  );
}
