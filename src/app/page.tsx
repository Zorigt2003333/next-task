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
      <main className="flex px-6 pt-22 py-4 gap-6 min-h-screen">
        <Sidebar onSelectCategory={setSelectedCategory} />
        <ProductSection selectedCategory={selectedCategory} />
      </main>
    </div>
  );
}
