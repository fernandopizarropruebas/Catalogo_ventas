import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/services/images';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    index?: number;
}

function formatPrice(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const navigate = useNavigate();
    const mainImage = product.images?.sort((a, b) => a.position - b.position)[0];
    const imageUrl = getImageUrl(mainImage?.file_path || null);

    return (
        <div
            className={`product-card stagger-${Math.min(index + 1, 8)}`}
            onClick={() => navigate(`/product/${product.id}`)}
            role="button"
            tabIndex={0}
            aria-label={`Ver producto ${product.name}`}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
        >
            <div className="product-card-image-container">
                <ImageWithFallback
                    src={imageUrl}
                    alt={product.name}
                    className="product-card-image"
                    fallbackIconSize={36}
                />
            </div>

            <div className="product-card-body">
                <h3 className="product-card-name">{product.name}</h3>

                <div className="product-card-price">
                    {product.sale_price_usd > 0 && (
                        <>
                            ${formatPrice(product.sale_price_usd)}
                            <span className="product-card-price-secondary">USD</span>
                        </>
                    )}
                    {product.sale_price_usd === 0 && product.sale_price_cup > 0 && (
                        <>
                            {formatPrice(product.sale_price_cup)}
                            <span className="product-card-price-secondary">CUP</span>
                        </>
                    )}
                </div>

                {product.sale_price_usd > 0 && product.sale_price_cup > 0 && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                        {formatPrice(product.sale_price_cup)} CUP
                    </div>
                )}
            </div>
        </div>
    );
}
