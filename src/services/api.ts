export enum ApiMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

interface configBody extends RequestInit {
    method: ApiMethod;
    body?: string;
}

export const api = async (path: string, method: ApiMethod, bodyObject = {}) => {
    const config: configBody = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    };
    const token = localStorage.getItem('userToken');

    if (typeof token === 'string') {
        config.headers = { ...config.headers, 'x-auth': token };
    }

    if (method !== ApiMethod.GET) {
        config.body = JSON.stringify(bodyObject);
    }

    const response = await fetch(`http://localhost:5000/api/${path}`, config);

    return response.json();
};
