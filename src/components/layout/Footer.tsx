import { useExchangeRate } from '@/hooks/useExchangeRate';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
    const { data: rate } = useExchangeRate();

    return (
        <footer className="footer">
            <div className="footer-inner">
                <span className="footer-brand">Catálogo Maybel</span>
                {rate && (
                    <div className="footer-rate">
                        <TrendingUp size={14} />
                        <span>Tasa USD/CUP:</span>
                        <span className="footer-rate-value">{rate.rate} CUP</span>
                    </div>
                )}
            </div>
        </footer>
    );
}
