import api from './api';
import type { ApiResponse, Product, PaginationMeta } from '@/types';

export interface ProductListParams {
    category_id?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface ProductListResult {
    products: Product[];
    meta: PaginationMeta;
}

export async function getProducts(params: ProductListParams): Promise<ProductListResult> {
    const { data } = await api.get<ApiResponse<Product[]>>('/products', { params });
    return {
        products: data.data,
        meta: data.meta || { page: 1, limit: 20, total: 0, total_pages: 0 },
    };
}

export async function getProduct(id: string): Promise<Product> {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data;
}
