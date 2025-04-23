import Cookies from 'js-cookie';

const API_BASE_URL = window.env && window.env.API_BASE_URL ? window.env.API_BASE_URL : '';

function getAuthToken() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    return cookiesAccepted ? Cookies.get('authToken') : localStorage.getItem('authToken');
}

export async function updateAuthenticatedUserNotificationPreferences(email) {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/notification/preferences`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}