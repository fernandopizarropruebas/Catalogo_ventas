import { useQuery } from '@tanstack/react-query';
import { getCategories, getCategory } from '@/services/categories';

export function useRootCategories() {
    return useQuery({
        queryKey: ['categories', 'root'],
        queryFn: () => getCategories(null),
        staleTime: 5 * 60 * 1000,
    });
}

export function useSubcategories(parentId: string) {
    return useQuery({
        queryKey: ['categories', 'children', parentId],
        queryFn: () => getCategories(parentId),
        staleTime: 5 * 60 * 1000,
        enabled: !!parentId,
    });
}

export function useCategory(id: string) {
    return useQuery({
        queryKey: ['categories', id],
        queryFn: () => getCategory(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
}
