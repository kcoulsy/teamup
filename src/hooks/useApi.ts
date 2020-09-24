import { useState, useEffect } from 'react';
import { api, ApiMethod } from './../services/api';

const useApi = (path: string, method: ApiMethod, bodyObject: any = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await api(path, method, bodyObject);
                setResponse(res);
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        })();
    }, []);

    return { response, error, loading };
};

export default useApi;
