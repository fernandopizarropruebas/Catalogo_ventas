import { API_BASE_URL } from '../constants';
import { APIResponse, Category, Product, ExchangeRates } from '../types';

async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const json: APIResponse<T> = await response.json();
    if (!json.success) {
      throw new Error(json.error?.message || 'Unknown API error');
    }
    return json.data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

async function fetchAPIWithPagination<T>(endpoint: string): Promise<{ data: T; pagination?: any }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const json: APIResponse<T> = await response.json();
    if (!json.success) {
      throw new Error(json.error?.message || 'Unknown API error');
    }
    return { data: json.data, pagination: json.pagination };
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  getCategories: () => fetchAPI<Category[]>('/categories?active=true'),
  
  getCategory: (id: string) => fetchAPI<Category>(`/categories/${id}`),

  getProducts: (params: { category_id?: string; page?: number; limit?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params.category_id) query.append('category_id', params.category_id);
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.search) query.append('search', params.search);
    query.append('active', 'true');
    
    return fetchAPIWithPagination<Product[]>(`/products?${query.toString()}`);
  },

  getProductDetail: (id: string) => fetchAPI<Product>(`/products/${id}`),

  getExchangeRates: () => fetchAPI<ExchangeRates>('/exchange-rates/current'),
};