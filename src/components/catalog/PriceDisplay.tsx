import type { Product } from '@/types';
import { PRICE_FIELDS } from '@/types';

interface PriceDisplayProps {
    product: Product;
}

function formatPrice(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PriceDisplay({ product }: PriceDisplayProps) {
    const activePrices = PRICE_FIELDS
        .map((field) => ({
            ...field,
            value: product[field.key] as number,
        }))
        .filter((p) => p.value > 0);

    if (activePrices.length === 0) {
        return <div style={{ color: 'var(--text-tertiary)' }}>Precio no disponible</div>;
    }

    return (
        <div className="price-display">
            {activePrices.map((price) => (
                <div className="price-tag" key={price.key}>
                    <span className="price-tag-amount">
                        {price.symbol}{formatPrice(price.value)}
                    </span>
                    <span className="price-tag-currency">{price.label}</span>
                </div>
            ))}
        </div>
    );
}
