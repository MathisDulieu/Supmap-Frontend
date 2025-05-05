import Cookies from 'js-cookie';

interface MapResponse {
    [key: string]: any;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface RoutePoint {
    latitude: number;
    longitude: number;
}

const API_BASE_URL = (window as any).env && (window as any).env.API_BASE_URL ? (window as any).env.API_BASE_URL : '';

function getAuthToken(): string | null {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    const cookieToken = Cookies.get('authToken');
    const localToken = localStorage.getItem('authToken');

    return cookiesAccepted ? (cookieToken || null) : localToken;
}

export async function getAllAlertsByPosition(latitude: number, longitude: number): Promise<MapResponse> {
    const response = await fetch(`${API_BASE_URL}/map/alerts/position`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude, longitude })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function getAllAlertsByRoute(routePoints: RoutePoint[]): Promise<MapResponse> {
    const response = await fetch(`${API_BASE_URL}/map/alerts/route`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ routePoints })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function getUserFavoriteLocations(): Promise<MapResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/favorite/locations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function saveNewUserFavoriteLocation(
    name: string,
    formattedAddress: string,
    coordinates: Coordinates,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    locationType: string
): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/favorite/location`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            name,
            formattedAddress,
            coordinates,
            street,
            city,
            postalCode,
            country,
            locationType
        })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function deleteUserFavoriteLocation(id: string): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/favorite/location/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function updateUserFavoriteLocation(
    id: string,
    name: string,
    formattedAddress: string,
    coordinates: Coordinates,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    locationType: string
): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/favorite/location/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            name,
            formattedAddress,
            coordinates,
            street,
            city,
            postalCode,
            country,
            locationType
        })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function saveUserRoute(
    startAddress: string,
    endAddress: string,
    startPoint: { lat: number; lng: number },
    endPoint:   { lat: number; lng: number },
    kilometersDistance: number,
    estimatedDurationInSeconds: number
  ): Promise<void> {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/private/map/save-route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        startAddress,
        endAddress,
        startPoint: { latitude: startPoint.lat, longitude: startPoint.lng },
        endPoint:   { latitude: endPoint.lat,   longitude: endPoint.lng   },
        kilometersDistance,
        estimatedDurationInSeconds
      })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to save route');
    }
  }

  
export async function getUserRouteHistory(): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/history/routes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function updateUserNavigationPreferences(
    avoidTolls: boolean,
    avoidHighways: boolean,
    avoidTraffic: boolean,
    showUsers: boolean,
    proximityAlertDistance: number,
    preferredTransportMode: string
): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/navigation-preferences`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            avoidTolls,
            avoidHighways,
            avoidTraffic,
            showUsers,
            proximityAlertDistance,
            preferredTransportMode
        })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function getNearbyUsers(latitude: number, longitude: number): Promise<MapResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/nearby-users?latitude=${latitude}&longitude=${longitude}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function shareLocation(latitude: number, longitude: number): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/location/share`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ latitude, longitude })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function shareRoute(
    startLatitude: number,
    startLongitude: number,
    endLatitude: number,
    endLongitude: number
  ): Promise<string> {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/private/map/route/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ startLatitude, startLongitude, endLatitude, endLongitude })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to share route');
    }
    return res.text();
  }