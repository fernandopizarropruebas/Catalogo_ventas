// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    meta?: PaginationMeta;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
}

// ============================================
// Category
// ============================================

export interface Category {
    id: string;
    name: string;
    description: string;
    parent_id: string | null;
    image_url: string | null;
    active: boolean;
    children?: Category[];
    parent?: Category | null;
}

// ============================================
// Product
// ============================================

export interface Product {
    id: string;
    name: string;
    description: string;
    category_id: string;
    category: Category;
    active: boolean;
    sale_price_usd: number;
    sale_price_cup: number;
    sale_price_eur: number;
    sale_price_mlc: number;
    sale_price_mxn: number;
    sale_price_cad: number;
    sale_price_brl: number;
    sale_price_zelle: number;
    sale_price_transfer_cup: number;
    sale_price_classic_usd: number;
    variants: Variant[];
    images: ProductImage[];
    lots?: Lot[];
}

// ============================================
// Variant & Stock
// ============================================

export interface StockSummary {
    total_quantity: number;
    reserved_quantity: number;
    available_quantity: number;
}

export interface Variant {
    id: string;
    color: string;
    size: string;
    material: string;
    sku: string;
    stock_summary: StockSummary | null;
}

// ============================================
// Product Image
// ============================================

export interface ProductImage {
    id: string;
    file_path: string;
    position: number;
    active: boolean;
}

// ============================================
// Lot (for detail view)
// ============================================

export interface Lot {
    id: string;
    lot_number: string;
    status: string;
    variant_stocks?: VariantStock[];
}

export interface VariantStock {
    id: string;
    variant_id: string;
    quantity: number;
    reserved: number;
    available: number;
}

// ============================================
// Exchange Rate
// ============================================

export interface ExchangeRate {
    id: string;
    rate: number;
    source_currency: string;
    target_currency: string;
    created_at: string;
}

// ============================================
// Price Map (for display)
// ============================================

export interface PriceEntry {
    key: string;
    label: string;
    value: number;
    symbol: string;
}

export const PRICE_FIELDS: { key: keyof Product; label: string; symbol: string }[] = [
    { key: 'sale_price_usd', label: 'USD', symbol: '$' },
    { key: 'sale_price_cup', label: 'CUP', symbol: '₱' },
    { key: 'sale_price_eur', label: 'EUR', symbol: '€' },
    { key: 'sale_price_mlc', label: 'MLC', symbol: 'MLC' },
    { key: 'sale_price_mxn', label: 'MXN', symbol: 'MX$' },
    { key: 'sale_price_cad', label: 'CAD', symbol: 'CA$' },
    { key: 'sale_price_brl', label: 'BRL', symbol: 'R$' },
    { key: 'sale_price_zelle', label: 'Zelle', symbol: '$' },
    { key: 'sale_price_transfer_cup', label: 'Transferencia CUP', symbol: '₱' },
    { key: 'sale_price_classic_usd', label: 'USD Clásico', symbol: '$' },
];
