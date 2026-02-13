import { useRootCategories } from '@/hooks/useCategories';
import CategoryCard from '@/components/catalog/CategoryCard';
import { CategoryGridSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

export default function HomePage() {
    const { data: categories, isLoading, isError } = useRootCategories();

    return (
        <div className="page-enter">
            {/* Hero Section */}
            <section className="hero">
                <h1 className="hero-title">
                    Explora nuestro <span className="hero-title-accent">catálogo</span>
                </h1>
                <p className="hero-subtitle">
                    Descubre la mejor selección de productos de calidad, organizados para ti.
                </p>
            </section>

            {/* Categories */}
            <section className="container">
                <div className="section-header">
                    <h2 className="section-title">Categorías</h2>
                    {categories && (
                        <span className="section-count">{categories.length} categorías</span>
                    )}
                </div>

                {isLoading && <CategoryGridSkeleton count={6} />}

                {isError && (
                    <EmptyState
                        type="categories"
                        message="Error al cargar"
                        description="No se pudieron cargar las categorías. Verifica que la API esté funcionando."
                    />
                )}

                {categories && categories.length > 0 && (
                    <div className="category-grid">
                        {categories.map((category, index) => (
                            <CategoryCard key={category.id} category={category} index={index} />
                        ))}
                    </div>
                )}

                {categories && categories.length === 0 && (
                    <EmptyState type="categories" />
                )}
            </section>
        </div>
    );
}
