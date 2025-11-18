import React, { useState, useMemo, useEffect } from 'react';
import { Moon, Sun, Flower2, Search, Filter, MapPin, Phone } from 'lucide-react';
import { BOUQUETS } from './constants';
import { Bouquet, FilterState, Occasion } from './types';
import { BouquetCard } from './components/BouquetCard';
import { AIGenerator } from './components/AIGenerator';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    occasion: '',
    sortOrder: 'default'
  });

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...BOUQUETS];

    if (filters.searchTerm) {
      const lowerTerm = filters.searchTerm.toLowerCase();
      result = result.filter(b => 
        b.name.toLowerCase().includes(lowerTerm) || 
        b.flowers.some(f => f.toLowerCase().includes(lowerTerm)) ||
        b.colors.some(c => c.toLowerCase().includes(lowerTerm))
      );
    }

    if (filters.occasion) {
      result = result.filter(b => b.occasion.includes(filters.occasion as Occasion));
    }

    if (filters.sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 transition-all">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary-500 p-2 rounded-full text-white">
              <Flower2 size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                Rose N Petals
              </h1>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MapPin size={10} /> Nehru Nagar, Ghaziabad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <a href="#products" className="hidden md:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500">Bouquets</a>
             <a href="#ai-designer" className="hidden md:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500">AI Designer</a>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        
        {/* Hero Banner */}
        <div className="rounded-2xl md:rounded-3xl bg-primary-100 dark:bg-gray-800 p-6 md:p-16 mb-8 md:mb-12 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-primary-900 dark:text-white mb-4">
                    Fresh Flowers, Delivered with Love
                </h2>
                <p className="text-sm md:text-lg text-primary-800 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
                    Premium floral arrangements for every occasion in Ghaziabad. Order now for same-day delivery.
                </p>
                <a href="#products" className="inline-block bg-primary-600 text-white px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base rounded-full font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30">
                    Shop Collection
                </a>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 dark:opacity-5">
                <Flower2 size={200} className="md:w-[300px] md:h-[300px]" />
            </div>
        </div>

        {/* AI Generator Section */}
        <div id="ai-designer">
            <AIGenerator />
        </div>

        {/* Filters & Toolbar - Compact & Responsive */}
        <div id="products" className="sticky top-[60px] md:top-[72px] z-40 bg-gray-50 dark:bg-gray-900 py-3 mb-6 transition-all">
          <div className="bg-white dark:bg-gray-800 p-2 md:p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
              
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search flowers..." 
                  className="w-full pl-9 pr-3 py-2 md:py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                />
              </div>

              {/* Filters Group - Scrollable on Mobile */}
              <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                <div className="flex items-center gap-2 min-w-max">
                    <select 
                      className="px-3 py-2 md:py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-primary-500 cursor-pointer"
                      value={filters.occasion}
                      onChange={(e) => setFilters({...filters, occasion: e.target.value})}
                    >
                      <option value="">All Occasions</option>
                      {Object.values(Occasion).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>

                    <select 
                      className="px-3 py-2 md:py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-primary-500 cursor-pointer"
                      value={filters.sortOrder}
                      onChange={(e) => setFilters({...filters, sortOrder: e.target.value as FilterState['sortOrder']})}
                    >
                      <option value="default">Sort by</option>
                      <option value="asc">Price: Low to High</option>
                      <option value="desc">Price: High to Low</option>
                    </select>

                    {(filters.searchTerm || filters.occasion || filters.sortOrder !== 'default') && (
                        <button 
                          onClick={() => setFilters({searchTerm: '', occasion: '', sortOrder: 'default'})}
                          className="px-3 py-2 md:py-1.5 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md transition-colors whitespace-nowrap font-medium"
                        >
                          Clear
                        </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(bouquet => (
              <BouquetCard key={bouquet.id} bouquet={bouquet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
             <Filter size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
             <p className="text-gray-500 dark:text-gray-400 text-lg">No bouquets found matching your filters.</p>
             <button 
                onClick={() => setFilters({searchTerm: '', occasion: '', sortOrder: 'default'})}
                className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline"
             >
                Clear all filters
             </button>
          </div>
        )}

      </main>

      <footer className="bg-gray-900 text-white pt-12 pb-6 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Flower2 className="text-primary-500" />
                        <span className="text-xl font-bold">Rose N Petals</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Your trusted local florist in Nehru Nagar, Ghaziabad. We deliver smiles through fresh, handcrafted bouquets using the finest flowers from the local market.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-200">Contact Us</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-center gap-3"><MapPin size={18} className="text-primary-500"/> Nehru Nagar, Ghaziabad, India</li>
                        <li className="flex items-center gap-3"><Phone size={18} className="text-primary-500"/> +91 9716615316</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-200">Delivery Areas</h3>
                    <div className="flex flex-wrap gap-2">
                         {['Nehru Nagar', 'Kavi Nagar', 'RDC', 'Raj Nagar', 'Indirapuram', 'Vaishali', 'Vasundhara', 'Crossings Republik'].map(area => (
                             <span key={area} className="text-xs bg-gray-800 border border-gray-700 px-2 py-1 rounded-full text-gray-300 hover:border-primary-500 transition-colors cursor-default">{area}</span>
                         ))}
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Rose N Petals. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;