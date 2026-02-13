import { API_BASE } from './api';

/**
 * Build full image URL from a file_path or image_url.
 * API returns paths like: /api/v1/images/products/12345_abc.webp
 * Full URL:  http://localhost:5000/api/v1/images/products/12345_abc.webp
 */
export function getImageUrl(path: string | null | undefined): string | null {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${API_BASE}${path}`;
}
