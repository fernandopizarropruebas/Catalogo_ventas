import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
    index?: number;
}

// Unique gradient for each card by index
const GRADIENTS = [
    'linear-gradient(135deg, #e84393, #fd79a8)',
    'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    'linear-gradient(135deg, #00cec9, #55efc4)',
    'linear-gradient(135deg, #f9ca24, #f0932b)',
    'linear-gradient(135deg, #e17055, #fab1a0)',
    'linear-gradient(135deg, #0984e3, #74b9ff)',
    'linear-gradient(135deg, #d63031, #ff7675)',
    'linear-gradient(135deg, #00b894, #55efc4)',
];

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
    const navigate = useNavigate();
    const childCount = category.children?.length || 0;
    const gradient = GRADIENTS[index % GRADIENTS.length];

    return (
        <div
            className={`cat-card stagger-${Math.min(index + 1, 8)}`}
            onClick={() => navigate(`/category/${category.id}`)}
            role="button"
            tabIndex={0}
            aria-label={`Ver categoría ${category.name}`}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/category/${category.id}`)}
            style={{ animationName: 'fadeInUp', animationDuration: '500ms', animationFillMode: 'both' }}
        >
            {/* Gradient accent strip */}
            <div className="cat-card-accent" style={{ background: gradient }} />

            {/* Text content */}
            <div className="cat-card-content">
                <h3 className="cat-card-name">{category.name}</h3>
                {childCount > 0 && (
                    <span className="cat-card-count">
                        {childCount} subcategoría{childCount !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* Arrow */}
            <div className="cat-card-arrow">
                <ChevronRight size={20} />
            </div>
        </div>
    );
}
