import Cookies from 'js-cookie';

interface UserResponse {
    [key: string]: any;
}

interface Location {
    latitude: number;
    longitude: number;
}

const API_BASE_URL = (window as any).env && (window as any).env.API_BASE_URL ? (window as any).env.API_BASE_URL : '';

function getAuthToken(): string | undefined {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    return cookiesAccepted ? Cookies.get('authToken') : localStorage.getItem('authToken');
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function deleteAuthenticatedUserAccount(): Promise<UserResponse> {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function setProfileImage(file: File): Promise<UserResponse> {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function updateAuthenticatedUserDetails(
    username: string,
    email: string,
    oldPassword: string | null,
    newPassword: string | null
): Promise<UserResponse> {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function createAdminAccount(
    username: string,
    email: string,
    password: string,
    profileImage: string | null,
    isValidEmail: boolean
): Promise<UserResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/protected/user/create-admin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            username,
            email,
            password,
            profileImage,
            isValidEmail
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function deleteAdminAccount(id: string): Promise<UserResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/protected/user/delete-admin/${id}`, {
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

export async function getAllUsers(keyword: string = '', page: number = 0): Promise<UserResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/admin/users?keyword=${encodeURIComponent(keyword)}&page=${page}`, {
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

export async function getUserAdminDashboardData(): Promise<UserResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/admin/user/dashboard-data`, {
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

export async function rateApplication(rate: number): Promise<UserResponse> {
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function updateUserLocation(location: Location): Promise<UserResponse> {
    const authToken = getAuthToken();

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/user/location`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ location })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}