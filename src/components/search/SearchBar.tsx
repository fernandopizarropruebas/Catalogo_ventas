import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialValue?: string;
    autoFocus?: boolean;
}

export default function SearchBar({ onSearch, initialValue = '', autoFocus = false }: SearchBarProps) {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value);
    };

    const handleClear = () => {
        setValue('');
        inputRef.current?.focus();
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <Search size={18} className="search-bar-icon" />
            <input
                ref={inputRef}
                type="text"
                className="search-bar-input"
                placeholder="Buscar productos..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Buscar productos"
            />
            {value && (
                <button type="button" className="search-bar-clear" onClick={handleClear} aria-label="Limpiar búsqueda">
                    <X size={16} />
                </button>
            )}
        </form>
    );
}
