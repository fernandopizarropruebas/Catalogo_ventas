import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { X, ImageOff } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { getImageUrl } from '@/services/images';
import Breadcrumb, { type BreadcrumbItem } from '@/components/layout/Breadcrumb';
import PriceDisplay from '@/components/catalog/PriceDisplay';
import VariantTable from '@/components/catalog/VariantTable';
import { Skeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading } = useProduct(id!);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [zoomOpen, setZoomOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="page-enter container">
                <div style={{ padding: 'var(--space-md) 0' }}>
                    <Skeleton style={{ width: '200px', height: '16px', marginBottom: 'var(--space-xl)' }} />
                </div>
                <div className="product-detail">
                    <Skeleton style={{ width: '100%', aspectRatio: '1', borderRadius: 'var(--radius-lg)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                        <Skeleton style={{ width: '60%', height: '24px' }} />
                        <Skeleton style={{ width: '80%', height: '36px' }} />
                        <Skeleton style={{ width: '100%', height: '80px' }} />
                        <Skeleton style={{ width: '100%', height: '120px' }} />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container">
                <EmptyState type="products" message="Producto no encontrado" />
            </div>
        );
    }

    // Sort images by position
    const sortedImages = [...(product.images || [])].sort((a, b) => a.position - b.position);
    const currentImage = sortedImages[selectedImageIndex];
    const currentImageUrl = getImageUrl(currentImage?.file_path || null);

    // Overall stock check
    const totalAvailable = product.variants?.reduce(
        (sum, v) => sum + (v.stock_summary?.available_quantity ?? 0),
        0
    ) ?? 0;
    const inStock = totalAvailable > 0;

    // Breadcrumb
    const breadcrumbItems: BreadcrumbItem[] = [];
    if (product.category?.parent) {
        breadcrumbItems.push({
            label: product.category.parent.name,
            to: `/category/${product.category.parent.id}`,
        });
    }
    if (product.category) {
        breadcrumbItems.push({
            label: product.category.name,
            to: `/category/${product.category.id}`,
        });
    }
    breadcrumbItems.push({ label: product.name });

    return (
        <div className="page-enter container">
            <Breadcrumb items={breadcrumbItems} />

            <div className="product-detail">
                {/* Gallery */}
                <div className="product-detail-gallery">
                    {currentImageUrl ? (
                        <img
                            src={currentImageUrl}
                            alt={product.name}
                            className="product-detail-main-image"
                            onClick={() => setZoomOpen(true)}
                        />
                    ) : (
                        <div className="gallery-placeholder">
                            <ImageOff className="gallery-placeholder-icon" strokeWidth={1} />
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sin imagen</span>
                        </div>
                    )}

                    {sortedImages.length > 1 && (
                        <div className="product-detail-thumbnail-list">
                            {sortedImages.map((img, index) => {
                                const thumbUrl = getImageUrl(img.file_path);
                                return thumbUrl ? (
                                    <img
                                        key={img.id}
                                        src={thumbUrl}
                                        alt={`${product.name} - imagen ${index + 1}`}
                                        className={`product-detail-thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                ) : null;
                            })}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="product-detail-info">
                    {product.category && (
                        <span className="product-detail-category">
                            {product.category.parent ? `${product.category.parent.name} / ` : ''}
                            {product.category.name}
                        </span>
                    )}

                    <h1 className="product-detail-name">{product.name}</h1>

                    {/* Stock indicator */}
                    <div>
                        <span className={`stock-badge ${inStock ? 'stock-badge-available' : 'stock-badge-unavailable'}`}>
                            <span className="stock-badge-dot" />
                            {inStock ? `${totalAvailable} disponible${totalAvailable !== 1 ? 's' : ''}` : 'Agotado'}
                        </span>
                    </div>

                    {/* Prices */}
                    <PriceDisplay product={product} />

                    {/* Description */}
                    {product.description && (
                        <p className="product-detail-description">{product.description}</p>
                    )}

                    {/* Variants */}
                    {product.variants && product.variants.length > 0 && (
                        <VariantTable variants={product.variants} />
                    )}
                </div>
            </div>

            {/* Zoom Modal */}
            {zoomOpen && currentImageUrl && (
                <div className="zoom-overlay" onClick={() => setZoomOpen(false)}>
                    <img
                        src={currentImageUrl}
                        alt={product.name}
                        className="zoom-image"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="zoom-close"
                        onClick={() => setZoomOpen(false)}
                        aria-label="Cerrar zoom"
                    >
                        <X size={24} />
                    </button>
                </div>
            )}
        </div>
    );
}
