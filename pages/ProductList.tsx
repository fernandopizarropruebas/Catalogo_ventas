import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductListProps {
  mode: 'category' | 'search';
}

const ProductList: React.FC<ProductListProps> = ({ mode }) => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Client-side filtering states
  const [priceFilter, setPriceFilter] = useState<'all' | 'under100' | 'over100'>('all');
  const [stockFilter, setStockFilter] = useState(false); // true = only available

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        if (mode === 'category') {
          // If viewing all categories
          if (!categoryId) {
            const cats = await api.getCategories();
            setCategories(cats);
            const prods = await api.getProducts({ limit: 50 }); // Get a mix
            setProducts(prods.data);
            setCurrentCategory(null);
          } else {
            // Specific category
            const [cat, prods] = await Promise.all([
              api.getCategory(categoryId),
              api.getProducts({ category_id: categoryId, limit: 100 })
            ]);
            setCurrentCategory(cat);
            setProducts(prods.data);
          }
        } else if (mode === 'search') {
          const prods = await api.getProducts({ search: query, limit: 50 });
          setProducts(prods.data);
        }
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los productos. Por favor intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode, categoryId, query]);

  // Filter Logic
  const filteredProducts = products.filter(p => {
    // Stock Filter
    if (stockFilter && p.total_stock <= 0) return false;

    // Price Filter (Using USD for simplicity)
    const price = p.prices.usd;
    if (priceFilter === 'under100' && price >= 100) return false;
    if (priceFilter === 'over100' && price < 100) return false;

    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:text-maybel-600">Inicio</Link>
              <span className="mx-2">/</span>
              {mode === 'search' ? (
                <span>Resultados de búsqueda</span>
              ) : (
                <>
                   <Link to="/categorias" className="hover:text-maybel-600">Categorías</Link>
                   {currentCategory && (
                     <>
                        <span className="mx-2">/</span>
                        <span className="font-semibold text-gray-800">{currentCategory.name}</span>
                     </>
                   )}
                </>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'search' 
                ? `Resultados para "${query}"` 
                : currentCategory 
                  ? currentCategory.name 
                  : 'Catálogo de Productos'}
            </h1>
            {currentCategory?.description && (
              <p className="text-gray-500 max-w-2xl">{currentCategory.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
             <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sticky top-24">
                <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Filtros</h3>
                
                {/* Availability */}
                <div className="mb-6">
                   <h4 className="text-sm font-semibold text-gray-600 mb-3">Disponibilidad</h4>
                   <label className="flex items-center gap-2 cursor-pointer hover:text-maybel-600">
                     <input 
                       type="checkbox" 
                       className="rounded text-maybel-600 focus:ring-maybel-500" 
                       checked={stockFilter}
                       onChange={(e) => setStockFilter(e.target.checked)}
                     />
                     <span className="text-sm text-gray-700">Solo disponible</span>
                   </label>
                </div>

                {/* Price */}
                <div className="mb-6">
                   <h4 className="text-sm font-semibold text-gray-600 mb-3">Precio (USD)</h4>
                   <div className="space-y-2">
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         name="price" 
                         className="text-maybel-600 focus:ring-maybel-500" 
                         checked={priceFilter === 'all'}
                         onChange={() => setPriceFilter('all')}
                       />
                       <span className="text-sm text-gray-700">Todos</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         name="price" 
                         className="text-maybel-600 focus:ring-maybel-500"
                         checked={priceFilter === 'under100'}
                         onChange={() => setPriceFilter('under100')}
                       />
                       <span className="text-sm text-gray-700">Menos de $100</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         name="price" 
                         className="text-maybel-600 focus:ring-maybel-500"
                         checked={priceFilter === 'over100'}
                         onChange={() => setPriceFilter('over100')}
                       />
                       <span className="text-sm text-gray-700">$100 o más</span>
                     </label>
                   </div>
                </div>

                {/* Categories Link list (only if viewing general catalogue) */}
                {mode === 'category' && !categoryId && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Categorías</h4>
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {categories.map(c => (
                        <li key={c.id}>
                          <Link to={`/categoria/${c.id}`} className="text-sm text-gray-600 hover:text-maybel-600 block">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
             </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>)}
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">{error}</div>
            ) : filteredProducts.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xl font-semibold text-gray-600">No encontramos productos.</p>
                  <p className="text-gray-500">Intenta cambiar los filtros o la búsqueda.</p>
               </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-500">
                  Mostrando {filteredProducts.length} productos
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;