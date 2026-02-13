import { useNavigate } from 'react-router-dom';
import { ArrowRight, Grid3X3 } from 'lucide-react';
import { getImageUrl } from '@/services/images';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
    index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
    const navigate = useNavigate();
    const imageUrl = getImageUrl(category.image_url);
    const childCount = category.children?.length || 0;

    return (
        <div
            className={`category-card stagger-${Math.min(index + 1, 8)}`}
            onClick={() => navigate(`/category/${category.id}`)}
            role="button"
            tabIndex={0}
            aria-label={`Ver categoría ${category.name}`}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/category/${category.id}`)}
            style={{ animationName: 'fadeInUp', animationDuration: '500ms', animationFillMode: 'both' }}
        >
            {imageUrl ? (
                <ImageWithFallback
                    src={imageUrl}
                    alt={category.name}
                    className="category-card-image"
                    fallbackClassName="category-card-placeholder"
                    fallbackIconSize={48}
                />
            ) : (
                <div className="category-card-placeholder">
                    <Grid3X3 size={48} strokeWidth={1} className="category-card-placeholder-icon" />
                </div>
            )}

            <div className="category-card-overlay">
                <h3 className="category-card-name">{category.name}</h3>
                {childCount > 0 && (
                    <span className="category-card-count">
                        {childCount} subcategoría{childCount !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            <div className="category-card-arrow">
                <ArrowRight size={18} />
            </div>
        </div>
    );
}
