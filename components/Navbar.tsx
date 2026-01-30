import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { Category } from '../types';
import { CONTACT_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Basic caching for categories
    const fetchCategories = async () => {
      try {
        const cached = localStorage.getItem('maybel_categories');
        if (cached) {
          setCategories(JSON.parse(cached));
          // Re-fetch quietly to update cache
          api.getCategories().then(data => {
            if (JSON.stringify(data) !== cached) {
              setCategories(data);
              localStorage.setItem('maybel_categories', JSON.stringify(data));
            }
          }).catch(console.error);
        } else {
          const data = await api.getCategories();
          setCategories(data);
          localStorage.setItem('maybel_categories', JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-maybel-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">Maybel</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-maybel-500 focus:ring-1 focus:ring-maybel-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-maybel-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
             <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-maybel-600 font-medium py-2">
                  Categorías
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute top-full right-0 w-56 bg-white rounded-md shadow-lg py-2 hidden group-hover:block border border-gray-100">
                  <Link to="/categorias" className="block px-4 py-2 text-sm text-gray-700 hover:bg-maybel-50 hover:text-maybel-600 font-semibold">
                    Ver todas
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  {categories.slice(0, 6).map(cat => (
                    <Link key={cat.id} to={`/categoria/${cat.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-maybel-50 hover:text-maybel-600">
                      {cat.name}
                    </Link>
                  ))}
                </div>
             </div>
             <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-600 transition-colors">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.585.085-.891.42-.306.334-1.169 1.142-1.169 2.785 0 1.643 1.2 3.232 1.366 3.481.166.249 2.364 3.612 5.728 5.065 2.228.963 2.68 7.71 3.659.71.979 0 .546-.386 2.502-1.285.57-.348 2.031-1.285 2.308-.277.272.248.335.845.335z"/></svg>
             </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-maybel-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="p-4 space-y-4">
             <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-maybel-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2">
               <Link to="/" className="p-2 text-gray-700 hover:text-maybel-600 font-medium">Inicio</Link>
               <Link to="/categorias" className="p-2 text-gray-700 hover:text-maybel-600 font-medium">Categorías</Link>
            </div>

            <div className="border-t border-gray-100 pt-2">
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categorías</span>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/categoria/${cat.id}`} className="text-sm text-gray-600 hover:text-maybel-600 py-1">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;