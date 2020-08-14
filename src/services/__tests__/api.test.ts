import { api } from '../api';

// jest.mock('fetch');

describe('api service helper', () => {
    it('returns fetch as GET with token', async () => {
        window.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        const urlParam = 'testpath';
        const fullUrl = 'http://localhost:5000/api/' + urlParam;
        const token = 'testtoken';
        const method = 'GET';
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token,
            },
        };

        jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(function () {
            return token;
        });

        await api('testpath', method);

        expect(window.fetch).toHaveBeenCalledWith(fullUrl, config);
    });

    it('returns fetch as GET without token', async () => {
        window.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        const urlParam = 'testpath';
        const fullUrl = 'http://localhost:5000/api/' + urlParam;
        const token = null;
        const method = 'GET';
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(function () {
            return token;
        });

        await api('testpath', method);

        expect(window.fetch).toHaveBeenCalledWith(fullUrl, config);
    });

    it('returns fetch as POST with token', async () => {
        window.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        const urlParam = 'testpath';
        const fullUrl = 'http://localhost:5000/api/' + urlParam;
        const token = 'testtoken';
        const body = {
            exampleField: 'test',
        };
        const method = 'POST';
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token,
            },
            body: JSON.stringify(body),
        };

        jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(function () {
            return token;
        });

        await api('testpath', method, body);

        expect(window.fetch).toHaveBeenCalledWith(fullUrl, config);
    });

    it('returns fetch as POST without token', async () => {
        window.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        const urlParam = 'testpath';
        const fullUrl = 'http://localhost:5000/api/' + urlParam;
        const token = null;
        const body = {
            exampleField: 'test',
        };
        const method = 'POST';
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(function () {
            return token;
        });

        await api('testpath', method, body);

        expect(window.fetch).toHaveBeenCalledWith(fullUrl, config);
    });
});
