import { useQuery } from '@tanstack/react-query';
import { getProducts, getProduct } from '@/services/products';
import type { ProductListParams } from '@/services/products';

export function useProducts(params: ProductListParams) {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
        staleTime: 2 * 60 * 1000,
        enabled: !!(params.category_id || params.search),
    });
}

export function useProduct(id: string) {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => getProduct(id),
        staleTime: 2 * 60 * 1000,
        enabled: !!id,
    });
}
