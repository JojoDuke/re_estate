// Import required dependencies from react-native and react
import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

// Interface defining options for useAppwrite hook
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>; // Function to execute
  params?: P; // Optional parameters
  skip?: boolean; // Whether to skip initial fetch
}

// Interface defining return type of useAppwrite hook
interface UseAppwriteReturn<T, P> {
  data: T | null; // Data returned from API
  loading: boolean; // Loading state
  error: string | null; // Error message if any
  refetch: (newParams: P) => Promise<void>; // Function to refetch data
}

// Custom hook for handling Appwrite API calls
export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  // State management for data, loading and error states
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  // Memoized function to fetch data
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        // Execute the provided function with parameters
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        // Handle errors and show alert
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  // Effect to fetch data on mount if skip is false
  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  // Function to manually refetch data with new parameters
  const refetch = async (newParams: P) => await fetchData(newParams);

  // Return hook values
  return { data, loading, error, refetch };
};