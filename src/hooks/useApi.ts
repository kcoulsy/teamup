import { useState, useEffect } from 'react';
import { api, ApiMethod } from './../services/api';

const useApi = (path: string, method: ApiMethod, bodyObject: any = {}) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [calls, setCalls] = useState(0);

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
  }, [calls, path, method, bodyObject]);

  const refetch = () => {
    setCalls(calls + 1);
  };

  return { response, error, loading, refetch };
};

export default useApi;
