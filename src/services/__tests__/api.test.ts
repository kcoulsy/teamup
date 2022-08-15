import { api } from '../api';
import { describe, expect, test, vi } from 'vitest';
// vi.mock('fetch');

describe('api service helper', () => {
  test('returns fetch as GET with token', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    vi.stubGlobal('fetch', fetchMock);

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

    vi.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
      function () {
        return token;
      }
    );

    await api('testpath', method);

    expect(fetchMock).toHaveBeenCalledWith(fullUrl, config);
  });

  test('returns fetch as GET without token', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
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

    vi.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
      function () {
        return token;
      }
    );

    await api('testpath', method);

    expect(fetchMock).toHaveBeenCalledWith(fullUrl, config);
  });

  test('returns fetch as POST with token', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
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

    vi.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
      function () {
        return token;
      }
    );

    await api('testpath', method, body);

    expect(fetchMock).toHaveBeenCalledWith(fullUrl, config);
  });

  test('returns fetch as POST without token', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
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

    vi.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation(
      function () {
        return token;
      }
    );

    await api('testpath', method, body);

    expect(fetchMock).toHaveBeenCalledWith(fullUrl, config);
  });
});
