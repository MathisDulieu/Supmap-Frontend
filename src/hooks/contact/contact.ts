const API_BASE_URL = (window as any).env && (window as any).env.API_BASE_URL ? (window as any).env.API_BASE_URL : '';

export async function sendSupportEmail(email: string, subject: string, content: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/contact/send-support-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, content }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function subscribeToNewsletter(email: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/contact/subscribe-newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}

export async function unsubscribeFromNewsletter(email: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/contact/unsubscribe-newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.text();
}