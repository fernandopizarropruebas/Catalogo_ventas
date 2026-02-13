import { createContext, useContext, useState, type ReactNode } from 'react';

interface SearchContextType {
    query: string;
    setQuery: (q: string) => void;
    isSearching: boolean;
    setIsSearching: (v: boolean) => void;
}

const SearchContext = createContext<SearchContextType>({
    query: '',
    setQuery: () => { },
    isSearching: false,
    setIsSearching: () => { },
});

export function SearchProvider({ children }: { children: ReactNode }) {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    return (
        <SearchContext.Provider value={{ query, setQuery, isSearching, setIsSearching }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}
