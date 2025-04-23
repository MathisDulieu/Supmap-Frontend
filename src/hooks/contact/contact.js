import Cookies from 'js-cookie';

const API_BASE_URL = window.env && window.env.API_BASE_URL ? window.env.API_BASE_URL : '';

export async function sendSupportEmail(email, subject, content) {
    const response = await fetch(`${API_BASE_URL}/contact/send-support-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, content }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function subscribeToNewsletter(email) {
    const response = await fetch(`${API_BASE_URL}/contact/subscribe-newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function unsubscribeFromNewsletter(email) {
    const response = await fetch(`${API_BASE_URL}/contact/unsubscribe-newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

export async function sendNewsletter(subject, content) {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    const authToken = cookiesAccepted ? Cookies.get('authToken') : localStorage.getItem('authToken');

    if (!authToken) {
        throw new Error('Authentication token not found');
    }

    const response = await fetch(`${API_BASE_URL}/private/admin/contact/send-newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ subject, content }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}