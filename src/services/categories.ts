import api from './api';
import type { ApiResponse, Category } from '@/types';

export async function getCategories(parentId?: string | null): Promise<Category[]> {
    const params: Record<string, string> = {};
    if (parentId === null || parentId === undefined) {
        params.parent_id = 'null';
    } else {
        params.parent_id = parentId;
    }
    const { data } = await api.get<ApiResponse<Category[]>>('/categories', { params });
    return data.data;
}

export async function getCategory(id: string): Promise<Category> {
    const { data } = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return data.data;
}
