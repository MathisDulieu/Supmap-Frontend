import { useState, useCallback, useRef, useEffect } from 'react';
import { getAllAlertsByRoute } from './map.ts';

interface RoutePoint {
    latitude: number;
    longitude: number;
}

interface Alert {
    id: string;
    type: string;
    location: RoutePoint;
    roadName: string;
    description: string;
    severity?: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
}

const colorByType: Record<string, string> = {
    ACCIDENT: '#EF4444',
    TRAFFIC_JAM: '#F59E0B',
    CONSTRUCTION: '#A855F7',
    ROAD_CLOSURE: '#DC2626',
    WEATHER: '#3B82F6',
    OTHER: '#6B7280'
};

export function useRouteAlerts(map: google.maps.Map | null) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const clearAlertMarkers = useCallback(() => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    }, [markers]);

    const addAlertMarkers = useCallback((routeAlerts: Alert[]) => {
        if (!map) return;

        clearAlertMarkers();

        const newMarkers: google.maps.Marker[] = routeAlerts.map(alert => {
            let scale = 8;

            if (alert.severity === 'HIGH') {
                scale = 10;
            } else if (alert.severity === 'LOW') {
                scale = 6;
            }

            const marker = new window.google.maps.Marker({
                position: {
                    lat: alert.location.latitude,
                    lng: alert.location.longitude
                },
                map,
                title: alert.description,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale,
                    fillOpacity: 0.9,
                    fillColor: colorByType[alert.type] || '#6B7280',
                    strokeWeight: 2,
                    strokeColor: '#ffffff'
                },
                zIndex: alert.severity === 'HIGH' ? 3 : (alert.severity === 'MEDIUM' ? 2 : 1)
            });

            const formattedType = alert.type
                .replace(/_/g, ' ')
                .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

            const createdAt = new Date(alert.createdAt).toLocaleString();
            const info = new window.google.maps.InfoWindow({
                content: `
          <div style="min-width:180px">
            <strong style="color:${colorByType[alert.type] || '#6B7280'}">${formattedType}</strong>
            <br>
            <strong>${alert.roadName}</strong>
            <br>
            ${alert.description}
            <br>
            <small>Reported: ${createdAt}</small>
          </div>
        `
            });

            marker.addListener('click', () => info.open({ anchor: marker, map }));

            return marker;
        });

        setMarkers(newMarkers);
    }, [map, clearAlertMarkers]);

    const fetchRouteAlerts = useCallback(async (routePoints: RoutePoint[]) => {
        if (!map || routePoints.length < 2) return;

        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            const sampledPoints = routePoints.length > 50
                ? sampleRoutePoints(routePoints, 50)
                : routePoints;

            const data = await getAllAlertsByRoute(sampledPoints);

            if (data && data.alerts) {
                setAlerts(data.alerts);
                addAlertMarkers(data.alerts);
            }
        } catch (e: any) {
            if (controllerRef.current?.signal.aborted) {
                console.log('Fetch route alerts aborted');
            } else {
                console.error('Failed to fetch route alerts', e);
                setError(e.message || 'Failed to fetch alerts for this route');
            }
        } finally {
            setLoading(false);
        }
    }, [map, addAlertMarkers]);

    const sampleRoutePoints = (points: RoutePoint[], maxPoints: number): RoutePoint[] => {
        if (points.length <= maxPoints) return points;

        const result: RoutePoint[] = [];
        const interval = points.length / (maxPoints - 1);

        result.push(points[0]);

        for (let i = 1; i < maxPoints - 1; i++) {
            const index = Math.floor(i * interval);
            result.push(points[index]);
        }

        result.push(points[points.length - 1]);
        return result;
    };

    const extractRoutePoints = useCallback((routeDetails: any): RoutePoint[] => {
        if (!routeDetails?.routes?.[0]?.overview_path) return [];

        return routeDetails.routes[0].overview_path.map((point: google.maps.LatLng) => ({
            latitude: point.lat(),
            longitude: point.lng()
        }));
    }, []);

    useEffect(() => {
        return () => {
            clearAlertMarkers();
            controllerRef.current?.abort();
        };
    }, [clearAlertMarkers]);

    return {
        alerts,
        loading,
        error,
        fetchRouteAlerts,
        clearAlertMarkers,
        extractRoutePoints
    };
}