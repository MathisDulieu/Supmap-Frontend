import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function getAuthToken() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    return cookiesAccepted ? Cookies.get('authToken') : localStorage.getItem('authToken');
}

export async function getMapAdminDashboardData() {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/admin/map/dashboard-data`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function saveNewAlert(alertType, latitude, longitude) {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/alert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ alertType, latitude, longitude })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function getAllAlertsByPosition(latitude, longitude) {
    const response = await fetch(`${API_BASE_URL}/map/alerts/position`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude, longitude })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function getAllAlertsByRoute(routePoints) {
    const response = await fetch(`${API_BASE_URL}/map/alerts/route`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ routePoints })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function getUserFavoriteLocations() {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function saveNewUserFavoriteLocation(name, formattedAddress, coordinates, street, city, postalCode, country, locationType) {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function deleteUserFavoriteLocation(id) {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function updateUserFavoriteLocation(id, name, formattedAddress, coordinates, street, city, postalCode, country, locationType) {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function validateUserAlert(id) {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/alert/validate/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function invalidateUserAlert(id) {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/alert/invalidate/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function saveUserRoute(startAddress, endAddress, startPoint, endPoint, kilometersDistance, estimatedDurationInSeconds) {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/save-route`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            startAddress,
            endAddress,
            startPoint,
            endPoint,
            kilometersDistance,
            estimatedDurationInSeconds
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function getUserRouteHistory() {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function updateUserNavigationPreferences(avoidTolls, avoidHighways, avoidTraffic, showUsers, proximityAlertDistance, preferredTransportMode) {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function getNearbyUsers(latitude, longitude) {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function shareLocation(latitude, longitude) {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function shareRoute(startLatitude, startLongitude, endLatitude, endLongitude) {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/route/share`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            startLatitude,
            startLongitude,
            endLatitude,
            endLongitude
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function saveNewRouteRecalculation() {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/map/route-recalculation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}