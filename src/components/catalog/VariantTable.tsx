import type { Variant } from '@/types';

interface VariantTableProps {
    variants: Variant[];
    stockByVariant: Map<string, number>;
}

export default function VariantTable({ variants, stockByVariant }: VariantTableProps) {
    if (!variants || variants.length === 0) return null;

    // Determine which columns to show
    const hasColor = variants.some((v) => v.color);
    const hasSize = variants.some((v) => v.size);
    const hasMaterial = variants.some((v) => v.material);

    // Total available across all variants
    const totalAvailable = Array.from(stockByVariant.values()).reduce((sum, qty) => sum + qty, 0);

    return (
        <div>
            <h3 className="variant-section-title">Variantes disponibles</h3>

            {/* Total quantity summary */}
            <div style={{ marginBottom: 'var(--space-md)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Cantidad total disponible:{' '}
                <strong style={{ color: totalAvailable > 0 ? 'var(--success)' : 'var(--danger)' }}>
                    {totalAvailable}
                </strong>
            </div>

            <div className="variant-table-wrapper">
                <table className="variant-table">
                    <thead>
                        <tr>
                            {hasColor && <th>Color</th>}
                            {hasSize && <th>Talla</th>}
                            {hasMaterial && <th>Material</th>}
                            <th>SKU</th>
                            <th>Cantidad disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variants.map((variant) => {
                            const available = stockByVariant.get(variant.id) ?? 0;
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
                                                className={`stock-badge ${inStock ? 'stock-badge-available' : 'stock-badge-unavailable'}`}
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
