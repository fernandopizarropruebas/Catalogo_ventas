import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import type { Product, PaginationMeta } from '@/types';

interface ProductGridProps {
    products: Product[];
    meta?: PaginationMeta;
    isLoading?: boolean;
    onPageChange?: (page: number) => void;
    emptyType?: 'products' | 'search';
}

export default function ProductGrid({
    products,
    meta,
    isLoading,
    onPageChange,
    emptyType = 'products',
}: ProductGridProps) {
    if (isLoading) {
        return <ProductGridSkeleton count={8} />;
    }

    if (!products || products.length === 0) {
        return <EmptyState type={emptyType} />;
    }

    const totalPages = meta?.total_pages || 1;
    const currentPage = meta?.page || 1;

    const getPageNumbers = (): (number | '...')[] => {
        const pages: (number | '...')[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <>
            <div className="product-grid">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange?.(currentPage - 1)}
                        disabled={currentPage <= 1}
                        aria-label="Página anterior"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {getPageNumbers().map((page, i) =>
                        page === '...' ? (
                            <span key={`ellipsis-${i}`} className="pagination-info">
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                                onClick={() => onPageChange?.(page)}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange?.(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        aria-label="Página siguiente"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </>
    );
}
