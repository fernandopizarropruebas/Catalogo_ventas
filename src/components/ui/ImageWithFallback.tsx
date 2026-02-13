import { useState } from 'react';
import { Package } from 'lucide-react';

interface ImageWithFallbackProps {
    src: string | null;
    alt: string;
    className?: string;
    fallbackClassName?: string;
    fallbackIconSize?: number;
}

export default function ImageWithFallback({
    src,
    alt,
    className = '',
    fallbackClassName = '',
    fallbackIconSize = 40,
}: ImageWithFallbackProps) {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    if (!src || error) {
        return (
            <div className={`product-card-placeholder ${fallbackClassName}`}>
                <Package size={fallbackIconSize} strokeWidth={1.2} />
                <span style={{ fontSize: '0.75rem', fontWeight: 500, textAlign: 'center', padding: '0 8px' }}>
                    {alt}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${loaded ? 'loaded' : ''}`}
            onError={() => setError(true)}
            onLoad={() => setLoaded(true)}
            loading="lazy"
        />
    );
}
