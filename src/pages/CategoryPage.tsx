import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCategory } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import CategoryCard from '@/components/catalog/CategoryCard';
import ProductGrid from '@/components/catalog/ProductGrid';
import Breadcrumb, { type BreadcrumbItem } from '@/components/layout/Breadcrumb';
import { CategoryGridSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

export default function CategoryPage() {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(1);

    const { data: category, isLoading: loadingCategory } = useCategory(id!);
    const hasChildren = category?.children && category.children.length > 0;

    const { data: productsData, isLoading: loadingProducts } = useProducts({
        category_id: id,
        page,
        limit: 20,
    });

    // Build breadcrumb
    const breadcrumbItems: BreadcrumbItem[] = [];
    if (category) {
        if (category.parent) {
            breadcrumbItems.push({
                label: category.parent.name,
                to: `/category/${category.parent.id}`,
            });
        }
        breadcrumbItems.push({ label: category.name });
    }

    if (loadingCategory) {
        return (
            <div className="page-enter container">
                <div style={{ padding: 'var(--space-xl) 0' }}>
                    <CategoryGridSkeleton count={4} />
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="container">
                <EmptyState type="categories" message="Categoría no encontrada" />
            </div>
        );
    }

    return (
        <div className="page-enter container">
            <Breadcrumb items={breadcrumbItems} />

            <div className="section-header">
                <h1 className="section-title">{category.name}</h1>
                {hasChildren && (
                    <span className="section-count">
                        {category.children!.length} subcategoría{category.children!.length !== 1 ? 's' : ''}
                    </span>
                )}
                {!hasChildren && productsData && (
                    <span className="section-count">
                        {productsData.meta.total} producto{productsData.meta.total !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {category.description && (
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>
                    {category.description}
                </p>
            )}

            {/* Show subcategories if they exist */}
            {hasChildren && (
                <div className="category-grid">
                    {category.children!.map((child, index) => (
                        <CategoryCard key={child.id} category={child} index={index} />
                    ))}
                </div>
            )}

            {/* Show products if no subcategories */}
            {!hasChildren && (
                <ProductGrid
                    products={productsData?.products || []}
                    meta={productsData?.meta}
                    isLoading={loadingProducts}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
