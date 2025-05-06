import Cookies from 'js-cookie';

interface UserResponse {
    [key: string]: any;
}

const API_BASE_URL = (window as any).env && (window as any).env.API_BASE_URL ? (window as any).env.API_BASE_URL : '';

function getAuthToken(): string | null {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    const cookieToken = Cookies.get('authToken');
    const localToken = localStorage.getItem('authToken');

    return cookiesAccepted ? (cookieToken || null) : localToken;
}

export async function getAuthenticatedUserDetails(): Promise<UserResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/user`, {
        method: 'POST',
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

export async function deleteAuthenticatedUserAccount(): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/user`, {
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

export async function setProfileImage(file: File): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/private/user/profile-image`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function updateAuthenticatedUserDetails(
    username: string | null,
    email: string | null,
    oldPassword: string | null,
    newPassword: string | null
): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            username,
            email,
            oldPassword,
            newPassword
        })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function rateApplication(rate: number): Promise<string> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/user/app/rate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ rate })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}