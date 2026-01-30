export interface Category {
  id: string;
  name: string;
  description?: string;
  parent_id?: string | null;
  active: boolean;
  subcategories?: Category[];
  product_count?: number;
}

export interface Prices {
  usd: number;
  eur?: number;
  cup?: number;
  mlc?: number;
  mxn?: number;
  cad?: number;
  brl?: number;
  zelle?: number;
  transfer_cup?: number;
  card_cup?: number;
  [key: string]: number | undefined;
}

export interface Image {
  id: string;
  url: string;
  position: number;
  active: boolean;
}

export interface Variant {
  id: string;
  color: string;
  sku?: string;
  stock: number;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  prices: Prices;
  total_stock: number;
  variants_count?: number;
  main_image?: string;
  images?: Image[];
  variants?: Variant[];
  active: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  pagination?: Pagination;
  error?: {
    code: string;
    message: string;
  };
}

export interface ExchangeRates {
  id: string;
  rates: {
    [key: string]: number;
  };
  valid_from: string;
}