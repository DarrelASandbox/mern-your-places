import { useCallback, useEffect, useRef, useState } from 'react';

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', headers = {}, body = null) => {
      setIsLoading(true);
      // Avoid setting state on an unmounted component
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });

        const data = await response.json();

        // filter for scalability in case of multiple requests
        // in which you do not want to empty the entire array
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (requestController) => requestController !== httpAbortController
        );

        if (!response.ok) throw new Error(data.message);

        setIsLoading(false);
        return data;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  // Cleanup function
  useEffect(
    () => () =>
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      ),
    []
  );

  const clearError = () => setError(null);

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
