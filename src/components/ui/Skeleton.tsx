interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
    return <div className={`skeleton ${className}`} style={style} />;
}

export function ProductCardSkeleton() {
    return (
        <div className="skeleton-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Skeleton className="skeleton-image" />
            <div style={{ padding: 'var(--space-md) var(--space-lg) var(--space-lg)' }}>
                <Skeleton className="skeleton-text" style={{ width: '80%' }} />
                <Skeleton className="skeleton-text" style={{ width: '50%' }} />
                <Skeleton className="skeleton-text-sm" style={{ width: '40%', marginTop: '8px' }} />
            </div>
        </div>
    );
}

export function CategoryCardSkeleton() {
    return <Skeleton className="skeleton-category" />;
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="product-grid">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="category-grid">
            {Array.from({ length: count }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
            ))}
        </div>
    );
}
