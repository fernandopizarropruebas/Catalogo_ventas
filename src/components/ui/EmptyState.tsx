import { PackageOpen, Search, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
    type?: 'products' | 'categories' | 'search';
    message?: string;
    description?: string;
}

const icons = {
    products: PackageOpen,
    categories: FolderOpen,
    search: Search,
};

const defaults = {
    products: {
        message: 'No hay productos',
        description: 'No se encontraron productos en esta categoría.',
    },
    categories: {
        message: 'No hay categorías',
        description: 'No se encontraron categorías disponibles.',
    },
    search: {
        message: 'Sin resultados',
        description: 'No se encontraron productos que coincidan con tu búsqueda.',
    },
};

export default function EmptyState({ type = 'products', message, description }: EmptyStateProps) {
    const Icon = icons[type];
    const defaultText = defaults[type];

    return (
        <div className="empty-state">
            <Icon className="empty-state-icon" strokeWidth={1.2} />
            <h3 className="empty-state-title">{message || defaultText.message}</h3>
            <p className="empty-state-description">{description || defaultText.description}</p>
        </div>
    );
}
