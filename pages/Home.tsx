import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Category, Product } from '../types';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          api.getCategories(),
          api.getProducts({ limit: 8 }) // Fetch 8 latest products
        ]);
        setCategories(cats.slice(0, 6)); // Top 6 categories
        setFeaturedProducts(prods.data);
      } catch (error) {
        console.error("Error loading home data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-maybel-600 to-maybel-800 text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Bienvenido a Maybel
          </h1>
          <p className="text-xl md:text-2xl text-maybel-100 mb-8 font-light">
            Tu tienda de confianza en Cuba. Encuentra electrodomésticos, muebles, vehículos y más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/categorias" className="bg-white text-maybel-700 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition shadow-lg">
                Explorar Categorías
             </Link>
             <Link to="/buscar" className="bg-maybel-700 border border-maybel-500 hover:bg-maybel-600 text-white px-8 py-3 rounded-full font-semibold transition">
                Buscar Productos
             </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Categorías Destacadas</h2>
        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-pulse">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/categoria/${cat.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 mb-3 bg-maybel-100 text-maybel-600 rounded-full flex items-center justify-center group-hover:bg-maybel-600 group-hover:text-white transition-colors">
                  {/* Placeholder Icon based on first letter */}
                  <span className="text-xl font-bold">{cat.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-gray-700 group-hover:text-maybel-700 transition-colors">{cat.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Nuevos Productos</h2>
           <Link to="/categorias" className="text-maybel-600 hover:text-maybel-800 font-medium text-sm md:text-base">Ver todo →</Link>
        </div>
        
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Info Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Cómo comprar?</h2>
              <p className="text-gray-300 mb-6">Elige tus productos favoritos y contáctanos directamente por WhatsApp o Telegram. Nos encargamos de coordinar el pago y la entrega.</p>
              <div className="flex gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-white">
                      <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">1</span>
                      <span className="text-sm font-medium">Elige</span>
                  </div>
                  <div className="w-8 h-px bg-gray-700 self-center"></div>
                   <div className="flex items-center gap-2 text-white">
                      <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">2</span>
                      <span className="text-sm font-medium">Contacta</span>
                  </div>
                  <div className="w-8 h-px bg-gray-700 self-center"></div>
                   <div className="flex items-center gap-2 text-white">
                      <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">3</span>
                      <span className="text-sm font-medium">Recibe</span>
                  </div>
              </div>
           </div>
           <div className="flex gap-4">
              <a href="https://wa.me/" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition">
                WhatsApp
              </a>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;