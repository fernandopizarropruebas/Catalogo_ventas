import api from './api';
import type { ApiResponse, ExchangeRate } from '@/types';

export async function getCurrentRate(): Promise<ExchangeRate> {
    const { data } = await api.get<ApiResponse<ExchangeRate>>('/exchange-rates/current');
    return data.data;
}
