import ProductGrid from '@/components/catalog/ProductGrid';
import type { Product, PaginationMeta } from '@/types';

interface SearchResultsProps {
    query: string;
    products: Product[];
    meta?: PaginationMeta;
    isLoading: boolean;
    onPageChange: (page: number) => void;
}

export default function SearchResults({ query, products, meta, isLoading, onPageChange }: SearchResultsProps) {
    return (
        <div>
            {query && (
                <div className="search-results-header">
                    <h2 className="section-title">
                        Resultados para <span className="search-results-query">"{query}"</span>
                    </h2>
                    {meta && meta.total > 0 && (
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '4px' }}>
                            {meta.total} producto{meta.total !== 1 ? 's' : ''} encontrado{meta.total !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            )}
            <ProductGrid
                products={products}
                meta={meta}
                isLoading={isLoading}
                onPageChange={onPageChange}
                emptyType="search"
            />
        </div>
    );
}
