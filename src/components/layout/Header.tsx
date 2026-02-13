import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Search, X, Sparkles } from 'lucide-react';
import SearchBar from '@/components/search/SearchBar';

export default function Header() {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    });
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const handleSearch = (query: string) => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setMobileSearchOpen(false);
        }
    };

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <Link to="/" className="header-logo">
                        <div className="header-logo-icon">
                            <Sparkles size={18} />
                        </div>
                        <span className="header-logo-text">Catálogo Maybel</span>
                    </Link>

                    <div className="header-search">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className="header-actions">
                        <button
                            className="mobile-search-trigger"
                            onClick={() => setMobileSearchOpen(true)}
                            aria-label="Buscar"
                        >
                            <Search size={20} />
                        </button>

                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Search Drawer */}
            <div className={`mobile-search-drawer ${mobileSearchOpen ? 'open' : ''}`}>
                <SearchBar onSearch={handleSearch} autoFocus />
                <button
                    className="mobile-search-close"
                    onClick={() => setMobileSearchOpen(false)}
                    aria-label="Cerrar búsqueda"
                >
                    <X size={20} />
                </button>
            </div>
        </>
    );
}
