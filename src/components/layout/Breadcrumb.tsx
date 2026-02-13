import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="breadcrumb" aria-label="Navegación">
            <div className="breadcrumb-item">
                <Link to="/" className="breadcrumb-link" aria-label="Inicio">
                    <Home size={15} />
                </Link>
            </div>

            {items.map((item, index) => (
                <div className="breadcrumb-item" key={index}>
                    <span className="breadcrumb-separator">
                        <ChevronRight size={14} />
                    </span>
                    {item.to && index < items.length - 1 ? (
                        <Link to={item.to} className="breadcrumb-link">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="breadcrumb-current">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
