import type { Variant } from '@/types';

interface VariantTableProps {
    variants: Variant[];
}

export default function VariantTable({ variants }: VariantTableProps) {
    if (!variants || variants.length === 0) return null;

    // Determine which columns to show
    const hasColor = variants.some((v) => v.color);
    const hasSize = variants.some((v) => v.size);
    const hasMaterial = variants.some((v) => v.material);

    return (
        <div>
            <h3 className="variant-section-title">Variantes disponibles</h3>
            <div className="variant-table-wrapper">
                <table className="variant-table">
                    <thead>
                        <tr>
                            {hasColor && <th>Color</th>}
                            {hasSize && <th>Talla</th>}
                            {hasMaterial && <th>Material</th>}
                            <th>SKU</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variants.map((variant) => {
                            const available = variant.stock_summary?.available_quantity ?? 0;
                            const inStock = available > 0;

                            return (
                                <tr key={variant.id}>
                                    {hasColor && <td>{variant.color || '—'}</td>}
                                    {hasSize && <td>{variant.size || '—'}</td>}
                                    {hasMaterial && <td>{variant.material || '—'}</td>}
                                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                                        {variant.sku || '—'}
                                    </td>
                                    <td>
                                        <div className="stock-cell">
                                            <span
                                                className={`stock-badge ${inStock ? 'stock-badge-available' : 'stock-badge-unavailable'
                                                    }`}
                                            >
                                                <span className="stock-badge-dot" />
                                                {inStock ? `${available} disponible${available !== 1 ? 's' : ''}` : 'Agotado'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
