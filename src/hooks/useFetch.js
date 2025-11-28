import { useEffect, useState } from "react";
import api from "../api";

export default function useFetch(url, params = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await api.get(url, { params });
      setData(response.data);
      return response.data;
    } catch (error) {
      setData(null);
      setError(
        error.response.data.message ||
          error.response.data.message ||
          "Error While getting data."
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return { data, loading, error, refetch: fetchData };
}
