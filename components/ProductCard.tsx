import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from '../constants';
import PriceDisplay from './PriceDisplay';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.main_image 
    ? (product.main_image.startsWith('http') ? product.main_image : `${IMAGE_BASE_URL}${product.main_image}`) 
    : PLACEHOLDER_IMAGE;

  const stockStatus = product.total_stock > 4 
    ? { label: 'Disponible', color: 'bg-green-100 text-green-800' }
    : product.total_stock > 0 
      ? { label: `Quedan ${product.total_stock}`, color: 'bg-yellow-100 text-yellow-800' }
      : { label: 'Agotado', color: 'bg-red-100 text-red-800' };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden group">
      <Link to={`/producto/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
          {stockStatus.label}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/producto/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-maybel-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500">{product.category.name}</p>
        </Link>
        
        <div className="mt-auto">
          <PriceDisplay prices={product.prices} compact={true} />
          
          <Link 
            to={`/producto/${product.id}`}
            className="mt-3 block w-full text-center py-2 px-4 bg-gray-50 hover:bg-maybel-50 text-maybel-600 font-medium rounded transition-colors border border-gray-200 hover:border-maybel-200"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;