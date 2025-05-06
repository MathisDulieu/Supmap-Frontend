import { useState, useCallback } from 'react';
import { shareRoute } from './map';

export function useRouteShare() {
    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const share = useCallback(
        async (
            startLat: number,
            startLng: number,
            endLat: number,
            endLng: number
        ) => {
            setIsLoading(true);
            setError(null);
            try {
                const url = await shareRoute(startLat, startLng, endLat, endLng);
                setQrUrl(url);
            } catch (e: any) {
                setError(e.message || 'Error generating QR code');
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    return { qrUrl, isLoading, error, share };
}