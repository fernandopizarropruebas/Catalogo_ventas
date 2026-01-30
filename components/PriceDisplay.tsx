import React, { useState } from 'react';
import { Prices } from '../types';
import { CURRENCY_LABELS } from '../constants';

interface PriceDisplayProps {
  prices: Prices;
  compact?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ prices, compact = false }) => {
  const [showAll, setShowAll] = useState(false);

  const formatPrice = (amount?: number) => {
    return amount !== undefined 
      ? new Intl.NumberFormat('es-CU', { style: 'decimal', minimumFractionDigits: 2 }).format(amount) 
      : '--';
  };

  const mainCurrencies = ['usd', 'cup'];
  
  if (compact) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-maybel-700">${formatPrice(prices.usd)}</span>
          <span className="text-xs text-gray-500 font-medium">USD</span>
        </div>
        {prices.cup && (
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold text-gray-700">${formatPrice(prices.cup)}</span>
            <span className="text-xs text-gray-500">CUP</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Precios</h3>
      
      {/* Main Prices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
        <div className="flex items-center justify-between p-3 bg-white rounded shadow-sm border border-gray-100">
           <span className="font-bold text-gray-700">USD</span>
           <span className="text-xl font-bold text-maybel-600">${formatPrice(prices.usd)}</span>
        </div>
        {prices.cup && (
          <div className="flex items-center justify-between p-3 bg-white rounded shadow-sm border border-gray-100">
             <span className="font-bold text-gray-700">CUP</span>
             <span className="text-xl font-bold text-gray-800">${formatPrice(prices.cup)}</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setShowAll(!showAll)}
        className="text-sm text-maybel-600 hover:text-maybel-800 font-medium flex items-center gap-1 mb-2 focus:outline-none"
      >
        {showAll ? 'Ver menos monedas' : 'Ver otras monedas (EUR, MLC, etc.)'}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Other Prices */}
      {showAll && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 animate-fadeIn">
          {Object.entries(prices).map(([key, value]) => {
            if (mainCurrencies.includes(key) || value === undefined) return null;
            return (
              <div key={key} className="flex flex-col p-2 bg-white rounded border border-gray-100 text-sm">
                <span className="text-gray-500 text-xs">{CURRENCY_LABELS[key] || key.toUpperCase()}</span>
                <span className="font-semibold text-gray-800">${formatPrice(value as number)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;