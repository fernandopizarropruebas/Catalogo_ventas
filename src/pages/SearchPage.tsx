import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SearchResults from '@/components/search/SearchResults';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('q') || '';
    const [page, setPage] = useState(1);

    // Reset page when query changes
    useEffect(() => {
        setPage(1);
    }, [queryParam]);

    const { data, isLoading } = useProducts({
        search: queryParam,
        page,
        limit: 20,
    });

    return (
        <div className="page-enter container">
            <Breadcrumb items={[{ label: `Búsqueda: "${queryParam}"` }]} />

            <SearchResults
                query={queryParam}
                products={data?.products || []}
                meta={data?.meta}
                isLoading={isLoading}
                onPageChange={setPage}
            />
        </div>
    );
}
