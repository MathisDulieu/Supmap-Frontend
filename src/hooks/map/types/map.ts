export type TravelMode = 'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT';

export interface Waypoint {
    id: string;
    placeholder: string;
    value: string | google.maps.LatLngLiteral;
    isUserLocation?: boolean;
}

export interface RoutePoint {
    latitude: number;
    longitude: number;
}

export interface RouteHistoryItem {
    id: string;
    startAddress: string;
    endAddress: string;
    startPoint: RoutePoint;
    endPoint: RoutePoint;
    kilometersDistance: number;
    estimatedDurationInSeconds: number;
    createdAt: string;
    userId: string;
}

export type AlertType = 'ACCIDENT' | 'TRAFFIC_JAM' | 'CONSTRUCTION' | 'ROAD_CLOSURE' | 'WEATHER' | 'OTHER';
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Alert {
    id: string;
    type: AlertType;
    location: RoutePoint;
    roadName: string;
    description: string;
    severity?: AlertSeverity;
    createdAt: string;
}

export interface RouteDetails extends google.maps.DirectionsResult {
    routes: google.maps.DirectionsRoute[];
    geocoded_waypoints: google.maps.DirectionsGeocodedWaypoint[];
    request: any;
    status: google.maps.DirectionsStatus;
}