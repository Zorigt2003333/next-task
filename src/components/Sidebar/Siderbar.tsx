'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SidebarProps = {
  onSelectCategory: (category: string) => void;
};

export default function Sidebar({ onSelectCategory }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    'jewelery',
    'electronics',
    "women's clothing",
    "men's clothing",
    'Эрүүл мэнд',
    'Согтууруулах ундаа',
    'Хоол',
    'Эх хүүхэд',
    'Цэвэрлэгээ',
    'Бэлдэц',
    'Цэцэг',
    'Амттан',
  ];

  const subcategoryMap: { [key: string]: string[] } = {
    Хоол: ['electronics'],
  };

  const toggleMenu = (category: string) => {
    const newCategory = category === activeCategory ? null : category;
    setActiveCategory(newCategory);
    if (newCategory) onSelectCategory(newCategory);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="lg:hidden fixed top-3 right-23 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-white rounded-full shadow-md text-gray-800 hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>
      <aside
        className="hidden lg:block w-80 bg-white p-4 rounded-2xl shadow-sm h-full transition-all duration-300"
        role="navigation"
        aria-label="Category Sidebar"
      >
        <h2 className="text-lg font-bold mb-4 text-gray-900">Ангилал</h2>
        <ul className="space-y-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const hasSub = subcategoryMap[cat]?.length > 0;

            return (
              <li key={cat} className="w-full">
                <motion.button
                  onClick={() => toggleMenu(cat)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-xl transition-colors text-left
                    ${isActive ? 'bg-[#F4F4F4] font-semibold shadow-sm' : 'hover:bg-[#F4F4F4]'}`}
                  whileHover={{ backgroundColor: '#F4F4F4', scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-gray-800">{cat}</span>
                  {hasSub && (isActive ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                </motion.button>
                {isActive && hasSub && (
                  <AnimatePresence>
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="pl-4 mt-1 space-y-1"
                    >
                      {subcategoryMap[cat].map((sub) => (
                        <motion.li
                          key={sub}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <button
                            onClick={() => onSelectCategory(sub)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F4F4F4] text-sm text-gray-700 transition-colors"
                          >
                            {sub}
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 w-3/4 h-full bg-white p-5 shadow-2xl z-50 lg:hidden overflow-y-auto"
            role="navigation"
            aria-label="Mobile Sidebar"
          >
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 p-2 text-gray-700 hover:text-gray-900"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-lg font-bold mb-4 text-gray-900">Ангилал</h2>

            <ul className="space-y-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const hasSub = subcategoryMap[cat]?.length > 0;

                return (
                  <li key={cat}>
                    <motion.button
                      onClick={() => toggleMenu(cat)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-left text-gray-800 text-sm transition-colors
                  ${isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      aria-expanded={isActive}
                      aria-controls={`submenu-${cat}`}
                    >
                      <span>{cat}</span>
                      {hasSub &&
                        (isActive ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                    </motion.button>

                    {isActive && hasSub && (
                      <AnimatePresence>
                        <motion.ul
                          id={`submenu-${cat}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 mt-2 space-y-1 overflow-hidden"
                        >
                          {subcategoryMap[cat].map((sub) => (
                            <motion.li
                              key={sub}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                            >
                              <button
                                onClick={() => {
                                  onSelectCategory(sub);
                                  toggleMobileMenu();
                                }}
                                className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {sub}
                              </button>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
      {isMobileMenuOpen && <div onClick={toggleMobileMenu}></div>}
    </>
  );
}
