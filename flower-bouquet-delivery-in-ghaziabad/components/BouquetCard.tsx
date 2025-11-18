import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Bouquet } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface Props {
  bouquet: Bouquet;
}

export const BouquetCard: React.FC<Props> = ({ bouquet }) => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Rose N Petals, I am interested in buying: ${bouquet.name} (ID: ${bouquet.id})`
  )}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full group">
      <div className="relative overflow-hidden h-64">
        <img 
          src={bouquet.imageUrl} 
          alt={bouquet.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono font-bold text-gray-700 dark:text-gray-200">
          {bouquet.id}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1" title={bouquet.name}>
            {bouquet.name}
          </h3>
          <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-2 py-1 rounded-full font-semibold">
            {bouquet.size}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
          {bouquet.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {bouquet.occasion.slice(0, 2).map((occ) => (
            <span key={occ} className="text-[10px] uppercase tracking-wider bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
              {occ}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            ₹{bouquet.price}
          </span>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <MessageCircle size={18} />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};