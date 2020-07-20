export const api = async (path, method, bodyObject = {}) => {
    try {
        const config = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        };
        const token = localStorage.getItem('userToken');

        if (typeof token === 'string') {
            config.headers = { ...config.headers, 'x-auth': token };
        }

        if (method !== 'GET') {
            config.body = JSON.stringify(bodyObject);
        }

        const response = await fetch(`http://localhost:5000/api/${path}`, config);

        if (response.ok) {
            return response.json();
        }
    } catch (e) {
        throw Error(e);
    }
};
