import { useQuery } from '@tanstack/react-query';
import { getCurrentRate } from '@/services/exchangeRates';

export function useExchangeRate() {
    return useQuery({
        queryKey: ['exchange-rate', 'current'],
        queryFn: getCurrentRate,
        staleTime: 10 * 60 * 1000,
    });
}
